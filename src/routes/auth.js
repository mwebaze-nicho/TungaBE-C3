const express = require("express");

const {
  registerUser,
  loginUser,
  confirmEmail,
} = require("../controllers/auth");
const { authenticateEmailToken } = require("../middleware/auth");

const router = express.Router();

router.post("/signup", registerUser);
router.patch("/verify/email", authenticateEmailToken, confirmEmail);
router.post("/login", loginUser);

module.exports = router;
