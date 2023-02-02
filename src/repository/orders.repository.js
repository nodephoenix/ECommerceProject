"use strict";
const { Order , Order_product } = require("../../sequelize/models");

class OrdersRepository {
  createOrder = async (userId) => {
    try {
      const createOrderInfo = await Order.create({
        status: 0,
        user_id: userId,
      });
      return createOrderInfo;
    } catch {
    }
  };

  createOrderDetail = async (orders_id, product_id, count) => {
    try {
      const orderDetail = await Order_product.create({
        count,
        orders_id,
        product_id
      });
      return orderDetail;
    } catch {
    }
  };
}

module.exports = OrdersRepository;
