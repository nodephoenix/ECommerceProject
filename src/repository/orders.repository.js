"use strict";
const { Order, Order_product, Cart } = require("../../sequelize/models");

class OrdersRepository {
  createOrder = async (userId) => {
    try {
      const createOrderInfo = await Order.create({
        status: 0,
        user_id: userId,
      });
      return createOrderInfo;
    } catch {
      throw new Error("알 수 없는 오류가 발생했습니다.");
    }
  };

  createOrderDetail = async (orders_id, product_id, count) => {
    try {
      const orderDetail = await Order_product.create({
        count,
        orders_id,
        product_id,
      });
      return orderDetail;
    } catch {
      throw new Error("알 수 없는 오류가 발생했습니다.");
    }
  };

  myCart = async (user_id) => {
    try {
      const myCartData = await Cart.findAll({
        where: { user_id: user_id },
      });

      return myCartData;
    } catch {
      throw new Error("알 수 없는 오류가 발생했습니다.");
    }
  };

  clearCart = async (user_id) => {
    try {
      await Cart.destroy({
        where: { user_id: user_id },
      });
    } catch {
      throw new Error("알 수 없는 오류가 발생했습니다.");
    }
  };

  cancelOrder = async (order_id) => {
    try {
      await Order_product.destroy({
        where: { orders_id: order_id },
      });
    } catch {
      throw new Error("알 수 없는 오류가 발생했습니다.");
    }
  };

  orderStatusChange = async (order_id, user_id) => {
    try {
      const updataData = await Order.update(
        { status: 4 },
        { where: { id: order_id, user_id: user_id } }
      );
      return updataData;
    } catch {
      throw new Error("알 수 없는 오류가 발생했습니다.");
    }
  };

  orderList = async (user_id) => {
    try {
      const orderListData = await Order.findAll({
        where: { user_id: user_id },
      });
      return orderListData;
    } catch {
      throw new Error("알 수 없는 오류가 발생했습니다.");
    }
  };

  orderDetail = async (order_id) => {
    try {
      const orderDetailList = await Order_product.findAll({
        where: { orders_id: order_id },
      });
      return orderDetailList;
    } catch {
      throw new Error("알 수 없는 오류가 발생했습니다.");
    }
  };
}

module.exports = OrdersRepository;
