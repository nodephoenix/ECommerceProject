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
    } catch (err) {
      res.status(404).json({ errorMessage: err.message });
    }
  };
  adminProducts = async (req, res, next) => {
    try {
      const productListData = await this.productsService.adminProducts();

      res.status(200).json(productListData);
    } catch(err){
      res.status(404).json({ errorMessage: err.message });
    }
  };
  /**
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  getProductDetail = async (req, res, next) => {
    

    try {

      const { productId } = req.params;
    
      const productDetail = await this.productsService.getProductDetail(
        Number(productId)
        );
        
        res.status(200).json(productDetail);
      } catch (e) {
        res.status(500).json({errorMessage: e.message})
      }
  };
}

module.exports = ProductsController;
