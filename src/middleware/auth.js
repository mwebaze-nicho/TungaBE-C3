const jwt = require("jsonwebtoken");

exports.authenticate = (req, res, next) => {
  const headerList = req.header("Authorization");

  if (!headerList) {
    return res.status(401).json("Access Denied");
  }
  const token = headerList.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json("Access Denied");
  }

  try {
    const verified = jwt.verify(token, process.env.AUTH_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json("Invalid Token");
  }
};

exports.authenticateEmailToken = (req, res, next) => {
  const headerList = req.header("Authorization");

  if (!headerList) {
    return res.status(401).json("Access Denied");
  }
  const token = headerList.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json("Access Denied");
  }

  try {
    const verified = jwt.verify(token, process.env.EMAIL_CONFIRM_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json("Invalid email verification token");
  }
};
