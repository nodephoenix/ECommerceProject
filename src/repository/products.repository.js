"use strict";
// @ts-check

/** @type {any} */
const db = require("../../sequelize/models");
/** @type {import("sequelize").ModelStatic<import('sequelize').Model>} */
const productModel = db["Product"];

class ProductsRepository {
  getProducts = async (offset, limit) => {
    return await productModel.findAll({
      raw: true,
      offset: offset,
      limit: limit,
      order: ["createdAt", "desc"],
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

  getPage = async () => {
    return await productModel.findAndCountAll({});
  };

  adminProducts = async () => {
    return await productModel.findAll({
      raw: true,
    });
  };
}

module.exports = ProductsRepository;
