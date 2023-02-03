"use strict";

const { equal } = require("joi");
const OrdersService = require("../services/orders.service.js");
const Status = require('../middleware/status.code.js')

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
      console.log(this.code.Forbidden.status)
      res.status(orderInfo.stauts).json(orderInfo.data)
    } catch (err) {
      res.status(this.code.Forbidden.status).json(this.code.Forbidden.message)
    }
  };

  orderCart = async (req, res) => {
    const userId = 1; // 임시
    const orderCartInfo = await this.ordersService.orderCart(userId);

    res.json({ message: "주문을 완료하였습니다." });
  };

  cancelOrder = async (req, res) => {
    const { orderId } = req.params;
    const userId = 1; // 임시
    const cancelOrder = await this.ordersService.cancelOrder(orderId, userId);

    res.json({ message: "주문이 취소되었습니다." });
  };

  myOrdersList = async (req, res) => {
    const userId = 1; // 임시
    const orderList = await this.ordersService.orderList(userId);

    res.json(orderList);
  };

  orderDetail = async (req, res) => {
    const userId = 1; // 임시
    const { orderId } = req.params;

    const orderDetail = await this.ordersService.orderDetail(orderId);

    res.json(orderDetail);
  };
}

module.exports = OrdersController;
