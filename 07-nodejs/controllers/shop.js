//controllers
const Product = require('../models/product')


// shop
exports.getShopProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
  });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'Shop',
      path: '/products',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
  });
};


exports.getCartProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/cart', {
      prods: products,
      pageTitle: 'cart | Shop',
      path: '/cart',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
  });
};

exports.getOrdersProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/orders', {
      prods: products,
      pageTitle: 'orders | Shop',
      path: '/orders',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
  });
};


exports.getCheckOutProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/checkout', {
      prods: products,
      pageTitle: 'checkout | Shop',
      path: '/checkout',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
  });
};
