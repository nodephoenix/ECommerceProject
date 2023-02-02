"use strict";
// @ts-check

/** @type {any} */
const db = require("../../sequelize/models");
/** @type {import("sequelize").ModelStatic<import('sequelize').Model>} */
const userModel = db["User"];
/** @type {import("sequelize").ModelStatic<import('sequelize').Model>} */
const productModel = db["Product"];
/** @type {import("sequelize").ModelStatic<import('sequelize').Model>} */
const orderModel = db["Order"];
/** @type {import("sequelize").ModelStatic<import('sequelize').Model>} */
const orderProductModel = db["Order_product"];

class AdminRepository {
  /**
   * @param {{productName: string; desc: string; price: number; image: string;}} body
   */
  registerProducts = async (body) => {
    const products = await productModel.create(body);
    products.save();
    return true;
  };

  /**
   * @param {number} productId
   * @param {{productName: string; desc: string; price: number; image: string;}} body
   */
  editProducts = async (productId, body) => {
    await productModel.update(body, {
      where: { id: productId },
    });
    return true;
  };

  /**
   * @param {number} productId
  
   */
  deleteProducts = async (productId) => {
    await productModel.destroy({
      where: { id: productId },
    });
    return true;
  };

  getProducts = async () => {
    // TODO: association 관계를 이용해서 원하는 형태로 받을 필요 있음.
    // const orders = await productModel.findAll({
    //   include: {
    //     model: orderProductModel,
    //     include: {
    //       model: productModel,
    //     },
    //   },
    //   raw: true,
    // });
    // const data = orders.map(order => ({...order, }))
    // return orders;
    return []
  };

  /**
   * @param {number} productId
   * @param {string} status
   */
  putProductsStatus = async (productId, status) => {
    await productModel.update(
      {
        status,
      },
      {
        where: { id: productId },
      }
    );
    return true;
  };

  /**
   * @param {number} userId
   * @param {number} grade
   */
  putUserGrade = async (userId, grade) => {
    await userModel.update(
      {
        grade,
      },
      {
        where: { id: userId },
      }
    );
    return true;
  };
}
module.exports = AdminRepository;
