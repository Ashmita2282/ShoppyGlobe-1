require("dotenv").config();

const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const UserModel = require("../models/User");

//Authentication middleware
module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ error: "User not logged in" });
    }

    const token = authorization.replace("Bearer ", "");

    const payload = await jwt.verify(token, JWT_SECRET);
    const user = await UserModel.findById(payload._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // const { _id } = payload;

    // const user = await UserModel.findById(_id);

    req.user = user; // Attach user to req for access in next middleware

    next();
  } catch (error) {
    console.error("Error in auth middleware:", error);

    res.status(500).json({
      message: "Authentication error",
      error: error.message,
    });
  }
};
