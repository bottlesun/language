const express = require('express');
const {getProducts, getCartProducts, getCheckOutProducts , getShopProducts, getOrdersProducts} = require('../controllers/shop')

const router = express.Router();

router.get('/', getShopProducts);
router.get('/products', getProducts);
router.get('/cart', getCartProducts);
router.get('/orders', getOrdersProducts);
router.get('/checkout', getCheckOutProducts);

module.exports = router;
