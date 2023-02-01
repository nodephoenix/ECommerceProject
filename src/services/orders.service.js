"use strict";

const OrdersRepository = require("../repository/orders.repository.js");

class OrdersService {
  ordersRepository = new OrdersRepository();

}

module.exports = OrdersService;