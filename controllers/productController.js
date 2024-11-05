const Product = require("../models/Product");

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({
      success: true,
      message: "Fetched All Products Successfully",
      products,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
      message: "Error while Fetching All Products",
    });
  }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({
      success: true,
      message: "Fetched Products by id successfully ",
      product,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
      message: "Error while Fetching Product by id",
    });
  }
};
