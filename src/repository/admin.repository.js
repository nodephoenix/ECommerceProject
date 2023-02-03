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
    return await Product.update(body, {
      where: { id: productId },
    });
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
    const orders = await Order.findAll({
      include: {
        model: Product,
        as: "items",
      },
    });
    return orders;
  };

  /**
   * @param {number} productId
   * @param {string} status
   */
  putProductsStatus = async (productId, status) => {
    return await Product.update(
      {
        status,
      },
      {
        where: { id: productId },
      }
    );
  };

  /**
   * @param {number} userId
   * @param {number} grade
   */
  putUserGrade = async (userId, grade) => {
    return await User.update(
      {
        grade,
      },
      {
        where: { id: userId },
      }
    );
  };
}
module.exports = AdminRepository;
