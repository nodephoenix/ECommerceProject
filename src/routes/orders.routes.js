"use strict";

const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const OrdersController = require("../controllers/orders.controllers.js");

const ordersController = new OrdersController();

// 단일 그림 주문하기(바로 주문) API o
router.post("/orders", authMiddleware, ordersController.orderArt);

// 장바구니 상품 주문하기 API o
router.post("/orders/carts", authMiddleware, ordersController.orderCart);

// 주문 취소하기 API x
router.put("/orders/:orderId", authMiddleware, ordersController.cancelOrder);

// 나의 주문 이력 조회 API x
router.get("/orders/list", authMiddleware, ordersController.myOrdersList);

// 자기 주문 상세 내역 조회 API x
router.get("/orders/:orderId", authMiddleware, ordersController.orderDetail);

module.exports = router;
