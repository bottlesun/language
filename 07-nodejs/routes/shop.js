const path = require('path');
const express = require('express');
const rootDir = require('../util/path');
const adminData = require('./admin');
const router = express.Router();

router.get('/', (req, res) => {
  console.log('shop.js => ',adminData.products)
  // routes 폴더의 기준에서의 __dirname 이기 때문에, views 폴더는 routes 폴더의 형제 폴더로 인식이 된다.
  // ../ 를 넣어줌으로 routes 폴더의 상위 기준에서 탐색을 하게 되서 검색이 된다.
  res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

module.exports = router