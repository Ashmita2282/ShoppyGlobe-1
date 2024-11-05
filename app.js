const express = require("express");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const userRoutes = require("./routes/userRoutes");
const { connect } = require("./config/database"); // Import the connect function

require("dotenv").config();

const app = express();
app.use(express.json());

app.use("/api", productRoutes);
app.use("/api", cartRoutes);
app.use("/api", userRoutes);

// Connect to MongoDB
connect();

module.exports = app;
