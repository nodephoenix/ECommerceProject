"use strict";
// @ts-check
/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 */

const ProductsService = require("../services/products.service.js");

class ProductsController {
  productsService = new ProductsService();

  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  getProducts = async (req, res, next) => {
    try {
      const { page } = req.params
      const curPage = Number(page)
      const pageSize = 8
      const productListData = await this.productsService.getProducts(curPage, pageSize);
      console.log(productListData)

      res.status(200).json(productListData);
    } catch {
      res.status(404).json({message : "예상하지 못한 에러가 발생"})
    }
  };

  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  getProductDetail = async (req, res, next) => {
    const { productId } = req.params;
    console.log(productId)
    const productDetail = await this.productsService.getProductDetail(Number(productId));

    res.status(200).json(productDetail)
  };
}

module.exports = ProductsController;
