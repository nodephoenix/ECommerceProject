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
    return await this.productsService.getProducts()
  };

  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  getProductDetail = async (req, res, next) => {
    const { productId } = req.params;
    return await this.productsService.getProductDetail(Number(productId))
  };
}

module.exports = ProductsController;
