const express = require('express');
const { getProducts, getProductById } = require('../controllers/productController');

const router = express.Router();

router.get('/products', getProducts);
router.get('/products/:id', getProductById);

module.exports = router;
