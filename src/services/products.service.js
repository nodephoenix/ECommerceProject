"use strict";
// @ts-check

const ProductsRepository = require("../repository/products.repository.js");

class ProductsService {
  productsRepository = new ProductsRepository();

  getProducts = async (page, pageSize) => {
    let start = 0

    if(page <= 0) {
      page = 1
    }
    else {
      start = 0 + (page - 1) * pageSize
    }
    const productCount = await this.productsRepository.getPage()
    const resultPage = productCount.count / pageSize
    const pageNum = Math.ceil(resultPage)
    const productsInfo = await this.productsRepository.getProducts(start, pageSize)

    return {productsInfo, pageNum} 
  };


  /**
   * @param {number} productId
   */ 
  getProductDetail = async (productId) => {
    return await this.productsRepository.getProductDetail(productId)
  };
}

module.exports = ProductsService;
