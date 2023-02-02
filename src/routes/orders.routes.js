"use strict";

const express = require("express");
const router = express.Router();

const OrdersController = require("../controllers/orders.controllers.js");
const ordersController = new OrdersController();

// 나의 주문 이력 조회 API
router.get("/orders", ordersController.myOrdersList);

// 자기 주문 상세 내역 조회 API
router.get("/orders/:orderId",);

// 장바구니 상품 주문하기 API
router.post("/orders/carts", ordersController.orderCart);

// 단일 그림 주문하기(바로 주문) API
router.post("/orders", ordersController.orderArt);

// 주문 취소하기 API
router.put("/orders/:orderId", ordersController.cancelOrder);

module.exports = router;
