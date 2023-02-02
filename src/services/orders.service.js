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

  orderCart = async (userId) => {
    const myCart = await this.ordersRepository.myCart(userId)
    const createOrder = await this.ordersRepository.createOrder(userId)
    const myCartDetail = myCart.map(detail => ({
      count : detail.count,
      order_id : createOrder.id,
      product_id : detail.product_id,
    }))

    for (const detail of myCartDetail) {
      await this.ordersRepository.createOrderDetail(detail.order_id,detail.product_id,detail.count)
    }
    // forEach는 배열의 각 항목에 비동기 처리가 불가능하다?
    // myCartDetail.forEach(detail => {
    //   this.ordersRepository.createOrderDetail(detail.order_id,detail.product_id,detail.count)
    // });

    await this.ordersRepository.clearCart(userId)
    return myCartDetail
  }

  cancelOrder = async (order_id, user_id) => {
    
    const orderStautsChange = await this.ordersRepository.orderStatusChange(order_id, user_id)
    console.log(orderStautsChange)
    await this.ordersRepository.cancelOrder(order_id)
  }

  orderList = async (user_id) => {
    const orderList = this.ordersRepository.orderList(user_id)

    return orderList
  }
}

module.exports = OrdersService;