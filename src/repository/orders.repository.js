"use strict";
const { Product, User } =require('../../sequelize/models')

class OrdersRepository {
  constructor(Order, Order_product, Cart) {
    this.order = Order;
    this.orderProduct = Order_product;
    this.cart = Cart;
  }

  createOrder = async (userId) => {
    try {
      const createOrderInfo = await this.order.create({
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
      const orderDetail = await this.orderProduct.create({
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
      const myCartData = await this.cart.findAll({
        where: { user_id: user_id },
      });

      return myCartData;
    } catch {
      throw new Error();
    }
  };

  clearCart = async (user_id) => {
    try {
      await this.cart.destroy({
        where: { user_id: user_id },
      });
    } catch {
      throw new Error();
    }
  };

  cancelOrder = async (order_id) => {
    try {
      const cancelData = await this.orderProduct.destroy({
        where: { order_id: order_id },
      });
      return cancelData;
    } catch {
      throw new Error();
    }
  };

  orderStatusChange = async (order_id, user_id) => {
    try {
      const updataData = await this.order.update(
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
      const orderListData = await this.order.findAll({
        where: { user_id: user_id },
        include : [{
          model: User
        }]
      });
      return orderListData;
    } catch {
      throw new Error();
    }
  };

  orderDetail = async (order_id) => {
    try {
      const orderDetailList = await this.order.findOne({
        where: { id: order_id },
        include : [
          {
            model : Product,
            as: 'items'
          }
        ]
      });
      console.log(orderDetailList)
      return orderDetailList;
    } catch (err){
      console.log(err)
      throw new Error();
    }
  };
}

module.exports = OrdersRepository;
