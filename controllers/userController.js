const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();


//api for user registration
exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res
      .status(201)
      .json({ success: true, message: "User registered successfully", user });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
      message: "Error while Register",
    });
  }
};


//api for user login
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { user: user, _id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "5h",
      }
    );
    res.send({
      success: true,
      message: "User Logged in successfully",
      token: token,
      user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
      message: "Error while login",
    });
  }
};
