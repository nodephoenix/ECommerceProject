"use strict";

const OrdersService = require("../services/orders.service.js");

class OrdersController {
  ordersService = new OrdersService();

  orderArt = async (req, res) => {
    try {
      const userId = 1
      const productId = 1
      const count = 4
      
      const orderInfo = await this.ordersService.orderArt(userId, productId, count)
      res.json(orderInfo)
    } catch{}
  };
}

module.exports = OrdersController;
