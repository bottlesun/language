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
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(prod => prod.id === product.id);
        console.log(cartProductData)
        if (cartProductData) {
          cartProducts.push({productData: product, qty: cartProductData.qty})
        }
      }
      res.render('shop/cart', {
        pageTitle: 'cart | Shop',
        path: '/cart',
        products: cartProducts,
      });
    });
  })
};

exports.postCartProducts = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  })
  res.redirect('/cart');
}

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });
};


exports.getOrdersProducts = (req, res, next) => {
    res.render('shop/orders', {
      pageTitle: 'orders | Shop',
      path: '/orders',
    });
};


exports.getCheckOutProducts = (req, res, next) => {
    res.render('shop/checkout', {
      pageTitle: 'checkout | Shop',
      path: '/checkout',
    });
};
