"use strict";

const express = require("express");
const router = express.Router();

const CartsController = require("../controllers/carts.controllers.js");
const authMiddleware = require("../middleware/authMiddleware.js");
const cartsController = new CartsController();

// 장바구니 조회 API o
router.get("/carts/", authMiddleware, cartsController.getCarts);

// 장바구니 추가 API o
router.post("/carts/:productId", authMiddleware, cartsController.createCart);

// 장바구니 상품 수량 수정 API o
router.put("/carts/:productId", authMiddleware, cartsController.updateCart);

// 장바구니 상품 삭제 API o
router.delete("/carts/:productId", authMiddleware, cartsController.deleteCart);

// 장바구니 상품 전체 삭제 API o
router.delete("/carts", authMiddleware, cartsController.deleteAllCarts);

module.exports = router;
