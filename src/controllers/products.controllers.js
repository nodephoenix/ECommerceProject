"use strict";

const ProductsService = require('../services/products.service.js');

class ProductsController {
    productsService = new ProductsService();
    
}

module.exports = ProductsController;