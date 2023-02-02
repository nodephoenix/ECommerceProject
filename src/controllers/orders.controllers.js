"use strict";

const OrdersService = require("../services/orders.service.js");

class OrdersController {
  ordersService = new OrdersService();

  orderArt = async (req, res) => {
    try {
      // req 임시
      const userId = 1
      const productId = 2
      const count = 4
      //

      const orderInfo = await this.ordersService.orderArt(userId, productId, count)
      res.status(200).json(orderInfo)
    } catch(err){
      res.status(err.code).json(err.message)
    }
  };

  orderCart = async (req, res) => {
    const userId = 1 // 임시
    const orderCartInfo = await this.ordersService.orderCart(userId)

    res.json(orderCartInfo)
  }

  cancelOrder = async (req, res) => {
    
  }
}

module.exports = OrdersController;
