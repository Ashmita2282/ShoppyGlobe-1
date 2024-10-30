const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
  mongoose
    .connect(process.env.url)
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("DB error:", err));
};
