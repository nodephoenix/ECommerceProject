"use strict";

const ProductsRepository = require("../repository/products.repository.js");

class ProductsService {
  productsRepository = new ProductsRepository();

}

module.exports = ProductsService;
