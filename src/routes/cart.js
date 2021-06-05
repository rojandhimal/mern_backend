const express = require('express');
const { requiredSignin, userMiddleware } = require('../common-middleware');
const router = express.Router();
const { addItemToCart } = require('../controller/cartController');

router.post('/user/cart/addtocart', requiredSignin, userMiddleware, addItemToCart);

module.exports = router;