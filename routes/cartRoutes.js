const express = require("express");
const {
  addToCart,
  updateCart,
  deleteFromCart,
  getCart,
} = require("../controllers/cartController");

//Middleware for user authentication
const auth = require("../middleware/auth");

const router = express.Router();

// Add to cart route
router.post("/add_cart", auth, addToCart);

// Update the quantity to cart route
router.put("/update_cart", auth, updateCart);

// Delete the item from cart route
router.delete("/delete_cart", auth, deleteFromCart);

// Fetch the card item
router.get("/cart", auth, getCart);

module.exports = router;
