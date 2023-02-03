"use strict";
// @ts-check

/** @type {any} */
const db = require("../../sequelize/models");
/** @type {import("sequelize").ModelStatic<import('sequelize').Model>} */
const User = db["User"];
/** @type {import("sequelize").ModelStatic<import('sequelize').Model>} */
const Product = db["Product"];
/** @type {import("sequelize").ModelStatic<import('sequelize').Model>} */
const Order = db["Order"];
/** @type {import("sequelize").ModelStatic<import('sequelize').Model>} */
const OrderProduct = db["Order_product"];

class AdminRepository {
  /**
   * @param {{productName: string; desc: string; price: number; image: string;}} body
   */
  registerProducts = async (body) => {
    const products = await Product.create(body);
    products.save();
    return true;
  };

  /**
   * @param {number} productId
   * @param {{productName: string; desc: string; price: number; image: string;}} body
   */
  editProducts = async (productId, body) => {
    await Product.update(body, {
      where: { id: productId },
    });
    return true;
  };

  /**
   * @param {number} productId
  
   */
  deleteProducts = async (productId) => {
    await Product.destroy({
      where: { id: productId },
    });
    return true;
  };

  getOrderProducts = async () => {
    // TODO: association 관계를 이용해서 원하는 형태로 받을 필요 있음.
    const orders = await Product.findAll({
      include: {
        model: OrderProduct,
      },
      raw: true,
    });
    const data = orders.map(order => ({...order, }))
    return orders;
  };

  /**
   * @param {number} productId
   * @param {string} status
   */
  putProductsStatus = async (productId, status) => {
    await Product.update(
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
    await User.update(
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
