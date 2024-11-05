const express = require('express');
const { getProducts, getProductById, deleteProductById, updateProductById } = require('../controllers/productController');

const router = express.Router();

// Fetch the products
router.get('/products',  getProducts);

// Fetch the product by id
router.get('/products/:id', getProductById);



module.exports = router;
