"use strict";
const { Order , Order_product, Cart } = require("../../sequelize/models");

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

  myCart = async (user_id) => {
    const myCartData = await Cart.findAll({
      where : {user_id : user_id}
    })

    return myCartData
  }

  clearCart = async (user_id) => {
    await Cart.destroy({
      where : { user_id : user_id }
    })
  }

  cancelOrder = async (order_id) => {
    await Order_product.destroy({
      where : { orders_id : order_id }
    })
  }

  orderStatusChange = async (order_id, user_id) => {
    const updataData = await Order.update({status : 4},{where :{id : order_id, user_id : user_id}})
    return updataData
  }
}

module.exports = OrdersRepository;
