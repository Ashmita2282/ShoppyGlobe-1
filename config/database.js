
const mongoose = require("mongoose");
require("dotenv").config();

// Database Connection Setup
exports.connect = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("DB connection error:", err));
};
