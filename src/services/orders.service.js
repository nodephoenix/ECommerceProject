"use strict";

const OrdersRepository = require("../repository/orders.repository.js");

class OrdersService {
  ordersRepository = new OrdersRepository();

  orderArt = async (userId, productId, count) => {
    try{
      const createOrder = await this.ordersRepository.createOrder(userId)
      
      const orderDetail =  await this.ordersRepository.createOrderDetail(createOrder.id, productId, count)
      return orderDetail
    } catch {
    }
  }
}

module.exports = OrdersService;