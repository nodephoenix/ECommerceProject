"use strict";

const { equal } = require("joi");
const OrdersService = require("../services/orders.service.js");
const Status = require("../middleware/status.code.js");

class OrdersController {
  ordersService = new OrdersService();
  code = new Status();

  orderArt = async (req, res) => {
    try {
      const { productId, count } = req.body;
      const userId = res.locals.user.id;

      const orderInfo = await this.ordersService.orderArt(
        userId,
        productId,
        count
      );

      res.status(orderInfo.status).json(orderInfo.message);
    } catch {
      res.status(this.code.Found().status).json(this.code.Found().message);
    }
  };

  orderCart = async (req, res) => {
    try {
      const userId = res.locals.user.id;
      const orderCartInfo = await this.ordersService.orderCart(userId);

      res.status(orderCartInfo.status).json(orderCartInfo.message);
    } catch {
      res.status(this.code.Found().status).json(this.code.Found().message);
    }
  };

  cancelOrder = async (req, res) => {
    try {
      const { orderId } = req.params;
      const userId = res.locals.user.id;
      const cancelOrder = await this.ordersService.cancelOrder(orderId, userId);

      res.status(cancelOrder.status).json(cancelOrder.message);
    } catch {
      res.status(this.code.Found().status).json(this.code.Found().message);
    }
  };

  myOrdersList = async (req, res) => {
    try {
      const userId = res.locals.user.id;
      const orderList = await this.ordersService.orderList(userId);

      res.status(orderList.status).json(orderList.data);
    } catch {
      res.status(this.code.Found().status).json(this.code.Found().message);
    }
  };

  orderDetail = async (req, res) => {
    try {
      const { orderId } = req.params;

      const orderDetail = await this.ordersService.orderDetail(orderId);
      if (!orderDetail.data) {
        return res.status(orderDetail.status).json(orderDetail.message);
      }
      res.status(orderDetail.status).json(orderDetail.data);
    } catch {
      res.status(this.code.Found().status).json(this.code.Found().message);
    }
  };
}

module.exports = OrdersController;
