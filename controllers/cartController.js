const Cart = require("../models/Cart");
const Product = require("../models/Product");

const mongoose = require("mongoose");
// Add product to cart
exports.addToCart = async (req, res) => {
  try {
    let { productId, quantity } = req.body;

    // Ensure productId is a string and remove extra spaces
    productId = productId.trim();

    // Log productId for debugging
    // console.log("Product ID received:", productId);
    // console.log("quantity ID received:", quantity);

    // Validate productId format
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      cart = new Cart({ userId: req.user._id, products: [] });
    }

    // Convert productId to ObjectId
    const productObjectId = new mongoose.Types.ObjectId(productId);
    const stockExists = await Product.findById(productObjectId);

    // Check if product exists and if stock is sufficient
    if (!stockExists) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (stockExists.stock < quantity) {
      return res.status(400).json({ message: "Not enough stock" });
    }

    // Find product in cart
    const product = cart.products.find((p) =>
      p.productId.equals(productObjectId)
    );
    if (product) {
      product.quantity += quantity;
      // If product exists in cart, add quantity
    } else {
      cart.products.push({ productId: productObjectId, quantity });
      // If product does not exist in cart, add product
    }

    await cart.save();
    res.status(201).json({
      success: true,
      message: "Added in cart successfully",
      cart,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error while adding to cart",
      error: err.message,
    });
  }
};
// Update product quantity in cart
exports.updateCart = async (req, res) => {
  try {
    let { productId, quantity } = req.body;

    // Ensure productId is a string and remove extra spaces
    productId = productId.trim();

    // Log productId for debugging
    // console.log("Product ID received:", productId);
    // console.log("Quantity received:", quantity);

    // Validate productId format
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const stockExists = await Product.findById(productId);
    if (!stockExists)
      return res.status(404).json({ message: "Product not found" });
    if (stockExists.stock < quantity) {
      return res.status(400).json({ message: "Not enough stock" });
    }

    // Convert productId to ObjectId for comparison
    const productObjectId = new mongoose.Types.ObjectId(productId);

    // Check if product exists in cart
    const product = cart.products.find((p) =>
      p.productId.equals(productObjectId)
    );

    // If product not found in cart, return 404
    if (!product) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // Update product quantity in cart
    product.quantity = quantity;

    await cart.save();
    res.status(201).json({
      success: true,
      message: "Updated quantity in cart successfully",
      cart,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error while updating cart",
      error: err.message,
    });
  }
};

// Delete product from cart
exports.deleteFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // Convert productId to ObjectId for comparison
    const productObjectId = new mongoose.Types.ObjectId(productId);

    // Find the product in the cart using .equals for ObjectId comparison
    const product = cart.products.find((p) =>
      p.productId.equals(productObjectId)
    );
    if (!product)
      return res.status(404).json({ message: "Product not found in cart" });

    // Filter out the product to delete it from the cart
    cart.products = cart.products.filter(
      (p) => !p.productId.equals(productObjectId)
    );

    await cart.save();
    res.status(201).json({
      success: true,
      message: "Deleted Product from cart successfully",
      cart,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error while deleting from cart",
      error: err.message,
    });
  }
};

// Get all products in cart
exports.getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user._id });

    // If no cart is found, initialize an empty cart response
    if (!cart) {
      return res.status(200).json({
        success: true,
        message: "Cart is empty",
        cart: [],
      });
    }

    // Check if the cart has products
    if (cart.products.length === 0) {
      return res.status(200).json({
        success: true,
        message: "Cart is empty",
        cart: [],
      });
    }

    // Extract all productIds from the cart
    const productIds = cart.products.map((p) => p.productId);

    // Retrieve all products in a single query
    const productsInCart = await Product.find({ _id: { $in: productIds } });

    // Map the products with quantities from the cart
    const products = productsInCart.map((product) => {
      const cartProduct = cart.products.find((p) =>
        p.productId.equals(product._id)
      );
      return { ...product._doc, quantity: cartProduct.quantity };
    });

    res.status(200).json({
      success: true,
      message: "Fetched the cart items",
      cart: products,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error retrieving cart",
      error: err.message,
    });
  }
};
