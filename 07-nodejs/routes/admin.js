const express = require('express');

const {getAddProduct, postAddProduct, getAdminProducts} = require('../controllers/admin')

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', getAddProduct);
// /admin/products => GET
router.get('/products', getAdminProducts);


// /admin/add-product => POST
router.post('/add-product', postAddProduct);

module.exports = router;