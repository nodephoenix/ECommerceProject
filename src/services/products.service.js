"use strict";
// @ts-check

const ProductsRepository = require("../repository/products.repository.js");

class ProductsService {
  productsRepository = new ProductsRepository();

  getProducts = async () => {
    return await this.productsRepository.getProducts()};

  /**
   * @param {number} productId
   */ 
  getProductDetail = async (productId) => {
    return await this.productsRepository.getProductDetail(productId)
  };
}

module.exports = ProductsService;
