const express = require('express');

const {getAddProduct, postAddProduct, getAdminProducts, getEditProduct} = require('../controllers/admin')

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', getAddProduct);

// /admin/products => GET
router.get('/products', getAdminProducts);


// /admin/add-product => POST
router.post('/add-product', postAddProduct);

router.get('/edit-product/:productId', getEditProduct)

module.exports = router;