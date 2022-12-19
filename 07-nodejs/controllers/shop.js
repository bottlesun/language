//controllers
const Product = require('../models/product')
const Cart = require('../models/cart')

// shop
exports.getShopProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
    });
  });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products',
    });
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title + ' | shop',
      path: '/products'
    });
  });
};


exports.getCartProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/cart', {
      prods: products,
      pageTitle: 'cart | Shop',
      path: '/cart',
    });
  });
};

exports.postCartProducts = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId,(product) => {
    Cart.addProduct(prodId, product.price);
  })
  res.redirect('/cart');
}

exports.getOrdersProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/orders', {
      prods: products,
      pageTitle: 'orders | Shop',
      path: '/orders',
    });
  });
};


exports.getCheckOutProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/checkout', {
      prods: products,
      pageTitle: 'checkout | Shop',
      path: '/checkout',
    });
  });
};
