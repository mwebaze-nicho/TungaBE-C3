const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      trim: true,
      required: [true, "First name is required."],
      lowercase: true,
    },
    last_name: {
      type: String,
      trim: true,
      required: [true, "Last name is required."],
      lowercase: true,
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Password is required to register"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email address is required"],
      validate: [validator.isEmail, "Provide a valid email address."],
      lowercase: true,
      unique: [true, "User email already exists"],
    },
    verifiedEmail: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
