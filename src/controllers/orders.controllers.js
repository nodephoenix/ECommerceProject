"use strict";

const OrdersService = require('../services/orders.service.js');

class OrdersController {
  ordersService = new OrdersService();
   
}

module.exports = OrdersController;