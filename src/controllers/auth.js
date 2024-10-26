const logger = require("../utils/logger");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../utils/emailSender");
exports.registerUser = async (req, res) => {
  try {
    const { first_name, last_name, email } = await req.body;
    const baseUrl = req.headers.origin;

    //Reject if no data provided
    if (!first_name || !last_name || !email) {
      res.status(400).json("One or more credentials are missing.");
      return;
    }

    //check to ensure that no duplicate email addresses
    if (await User.findOne({ email })) {
      res.status(409).json("User or email already exists.");
      return;
    }

    // generate 6 character passwords automatically
    const passwordValues = process.env.PASSWORD_STRING;

    let password = "";

    for (let i = 0; i < 6; i++) {
      const index = Math.floor(Math.random() * passwordValues.length);
      password += passwordValues[index];
    }

    //Hash the password
    const SALTROUNDS = process.env.HASH_SALTS * 1;
    const hashedPassword = await bcrypt.hash(password, SALTROUNDS);

    //Register new student
    const user = new User({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });

    // save user
    await user.save();

    //send confirmation email
    const token = jwt.sign(
      { userId: user._id },
      process.env.EMAIL_CONFIRM_SECRET,
      { expiresIn: "1h" }
    );

    const emailInfo = {
      email,
      token,
      baseUrl,
      password,
    };

    await sendEmail(emailInfo);

    res.status(201).json({
      message:
        "User registered successfully. Please confirm your email to access full services.",
    });
  } catch (error) {
    logger.error("Error registering user:", error);
    res.status(500).json({
      message: "Server error occured.",
      error: error.ermsg || error.message,
    });
  }
};

exports.confirmEmail = async (req, res) => {
  try {
    const id = req.user.userId;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await User.findByIdAndUpdate(id, {
      verifiedEmail: true,
    });

    res.status(200).json({
      message: "Email verified successfully.",
    });
  } catch (error) {
    logger.error("Error: " + error);
    res.status(500).json({
      message: "Error verifying email.",
    });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = await req.body;
  try {
    //Reject if no data provided
    if (!email || !password) {
      res.status(400).json({ message: "No data to validate" });
      return;
    }

    //Check for student details
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const matchingPassword = await bcrypt.compare(
      password.trim(),
      user.password
    );

    if (!matchingPassword) {
      return res.status(401).json({ message: "No matching password." });
    }

    if (user.verifiedEmail === false) {
      const baseUrl = req.headers.host;

      //send confirmation email
      const token = jwt.sign(
        { userId: user._id, username: user.username },
        process.env.EMAIL_CONFIRM_SECRET,
        { expiresIn: "1h" }
      );

      try {
        await sendEmail(user.email, token, baseUrl);
      } catch (emailError) {
        return res
          .status(500)
          .json({ message: "Failed to send confirmation email." });
      }

      return res.status(403).json({
        message: "User email not verified. Please verify email first.",
      });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.first_name },
      process.env.AUTH_SECRET
    );
    res.status(200).json({ token });
  } catch (error) {
    logger.error("Error authenticating user:", error);
  }
};
