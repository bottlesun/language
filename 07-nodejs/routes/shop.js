const express = require('express');
const {
  getProduct,
  getProducts,
  getCartProducts,
  getCheckOutProducts,
  getShopProducts,
  getOrdersProducts,
  postCartProducts,
  postCartDeleteProduct
} = require('../controllers/shop')

const router = express.Router();

router.get('/', getShopProducts);
router.get('/products', getProducts);

router.get('/products/:productId', getProduct);

router.get('/cart', getCartProducts);
router.post('/cart', postCartProducts);
router.post('/cart-delete-item', postCartDeleteProduct);


router.get('/orders', getOrdersProducts);
router.get('/checkout', getCheckOutProducts);

module.exports = router;
