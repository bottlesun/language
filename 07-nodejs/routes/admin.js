const path = require("path");
const express = require('express');

const rootDir = require('../util/path')

const router = express.Router();

const products = [];

// use 같은 경우는 모든 요청에 반응하지만,  post get 등으로 미들요청을 걸러서 받을 수 도 있다.


// /admin/add-product => GET
router.get('/add-product', (req, res) => {
  res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
});

// /admin/add-product => POST
router.post('/add-product', (req, res) => {
  products.push({title: req.body.title})
  res.redirect('/'); // redirect() 경로를 리다이렉트 하여 줍니다.
})

exports.routes = router;
exports.products = products;