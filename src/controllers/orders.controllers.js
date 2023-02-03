"use strict";

const { equal } = require("joi");
const OrdersService = require("../services/orders.service.js");
const Status = require("../middleware/status.code.js");

class OrdersController {
  ordersService = new OrdersService();
  code = new Status();

  orderArt = async (req, res) => {
    try {
      // req 임시
      const userId = 1;
      const productId = 2;
      const count = 4;
      //

      const orderInfo = await this.ordersService.orderArt(
        userId,
        productId,
        count
      );

      res.status(orderInfo.status).json(orderInfo.message);
    } catch (err) {
      res.status(this.code.Forbidden.status).json(this.code.Forbidden.message);
    }
  };

  orderCart = async (req, res) => {
    try {
      const userId = 1; // 임시
      const orderCartInfo = await this.ordersService.orderCart(userId);

      res.status(orderCartInfo.status).json(orderCartInfo.message);
    } catch {
      res.status(this.code.Forbidden.status).json(this.code.Forbidden.message);
    }
  };

  cancelOrder = async (req, res) => {
    try {
      const { orderId } = req.params;
      const userId = 1; // 임시
      const cancelOrder = await this.ordersService.cancelOrder(orderId, userId);

      res.status(cancelOrder.status).json(cancelOrder.message);
    } catch {
      res.status(this.code.Forbidden.status).json(this.code.Forbidden.message);
    }
  };

  myOrdersList = async (req, res) => {
    try {
      const userId = 1; // 임시
      const orderList = await this.ordersService.orderList(userId);

      res.status(orderList.status).json(orderList.data);
    } catch {
      res.status(this.code.Forbidden.status).json(this.code.Forbidden.message);
    }
  };

  orderDetail = async (req, res) => {
    try {
      const userId = 1; // 임시
      const { orderId } = req.params;

      const orderDetail = await this.ordersService.orderDetail(orderId);
      if (!orderDetail.data) {
        return res.status(orderDetail.status).json(orderDetail.message);
      }
      res.status(orderDetail.status).json(orderDetail.data);
    } catch {
      res.status(this.code.Forbidden.status).json(this.code.Forbidden.message);
    }
  };
}

module.exports = OrdersController;
