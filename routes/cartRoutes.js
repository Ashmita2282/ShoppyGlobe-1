const express = require('express');
const { addToCart } = require('../controllers/cartController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/cart', auth, addToCart);

//PUT /cart/Update the quantity of a product in the cart.


//Delete /cart/Update the quantity of a product in the cart.

module.exports = router;
