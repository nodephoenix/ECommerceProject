"use strict";
// @ts-check

/** @type {any} */
const db = require("../../sequelize/models");
/** @type {import("sequelize").ModelStatic<import('sequelize').Model>} */
const productModel = db["Product"];

class ProductsRepository {
  getProducts = async () => {
    return await productModel.findAll({
      raw: true
    });
  };

  /**
   * @param {number} productId
   */
  getProductDetail = async (productId) => {
    return await productModel.findOne({
      where: {
        id: productId,
      },
      raw: true,
    });
  };
}

module.exports = ProductsRepository;
