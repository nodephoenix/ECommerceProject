"use strict";

const express = require("express");
const router = express.Router();

const CartsController = require("../controllers/carts.controllers.js");
const authMiddleware = require("../middleware/authMiddleware.js");
const cartsController = new CartsController();

// 장바구니 조회 API
router.get("/carts/", authMiddleware, cartsController.getCart);

// 장바구니 상품 수량 수정 API
router.patch("/carts/:productId", authMiddleware, cartsController.addCart);

// 장바구니 상품 삭제 API
// router.delete(
//   "/api/carts/:productId",
//   authMiddleware,
//   cartsController.deleteCarts
// );

// 장바구니 상품 전체 삭제 API
// router.delete("/api/carts", authMiddleware, cartsController.deleteAllCarts);

module.exports = router;
