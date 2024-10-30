const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();

const app = express();
app.use(express.json());

app.use("/api", productRoutes);
app.use("/api", cartRoutes);
app.use("/api", userRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log("MongoDB connection error:", err));

module.exports = app;
