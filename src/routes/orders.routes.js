"use strict";

const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const OrdersController = require("../controllers/orders.controllers.js");

const ordersController = new OrdersController();

// 나의 주문 이력 조회 API
router.get("/orders", authMiddleware, ordersController.myOrdersList);

// 자기 주문 상세 내역 조회 API
router.get("/orders/:orderId", authMiddleware, ordersController.orderDetail);

// 장바구니 상품 주문하기 API
router.post("/orders/carts", authMiddleware, ordersController.orderCart);

// 단일 그림 주문하기(바로 주문) API
router.post("/orders", authMiddleware, ordersController.orderArt);

// 주문 취소하기 API
router.put("/orders/:orderId", authMiddleware, ordersController.cancelOrder);

module.exports = router;
