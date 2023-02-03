"use strict";
const { Order, Order_product, Cart } = require("../../sequelize/models");
const Status = require("../middleware/status.code");

class OrdersRepository {
  code = new Status();

  createOrder = async (userId) => {
    try {
      const createOrderInfo = await Order.create({
        status: 0,
        user_id: userId,
      });
      return createOrderInfo;
    } catch {
      throw new Error();
    }
  };

  createOrderDetail = async (order_id, product_id, count) => {
    try {
      const orderDetail = await Order_product.create({
        count,
        order_id,
        product_id,
      });
      return orderDetail;
    } catch {
      throw new Error();
    }
  };

  myCart = async (user_id) => {
    try {
      const myCartData = await Cart.findAll({
        where: { user_id: user_id },
      });

      return myCartData;
    } catch {
      throw new Error();
    }
  };

  clearCart = async (user_id) => {
    try {
      await Cart.destroy({
        where: { user_id: user_id },
      });
    } catch {
      throw new Error();
    }
  };

  cancelOrder = async (order_id) => {
    try {
      const cancelData = await Order_product.destroy({
        where: { order_id: order_id },
      });
      return cancelData;
    } catch {
      throw new Error();
    }
  };

  orderStatusChange = async (order_id, user_id) => {
    try {
      const updataData = await Order.update(
        { status: 4 },
        { where: { id: order_id, user_id: user_id, status: 0 } }
      );
      return updataData;
    } catch {
      throw new Error();
    }
  };

  orderList = async (user_id) => {
    try {
      const orderListData = await Order.findAll({
        where: { user_id: user_id },
      });
      return orderListData;
    } catch {
      throw new Error();
    }
  };

  orderDetail = async (order_id) => {
    try {
      const orderDetailList = await Order_product.findAll({
        where: { order_id: order_id },
      });
      return orderDetailList;
    } catch {
      throw new Error();
    }
  };
}

module.exports = OrdersRepository;
