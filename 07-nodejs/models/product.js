// models
const fs = require('fs');
const path = require('path');
const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFiles = cb => {

  fs.readFile(p, (err, fileContent) => {
    if (err) return cb([]);
    return cb(JSON.parse(fileContent));
  })
}

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    this.id = Math.random().toString();
    getProductsFromFiles(products => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err)
      })
    });
  }

  static fetchAll(cb) {
    getProductsFromFiles(cb)
  }

  static findById(id, cb) {
    getProductsFromFiles(products => {
      const product = products.find(p => p.id === id);
      cb(product);
    });
  }
};