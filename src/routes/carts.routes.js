"use strict";

const express = require('express');
const router = express.Router();

const CartsController = require('../controllers/carts.controllers.js');
const cartsController = new CartsController();

// 장바구니 상품 추가 API
router.put('/api/carts/:productId', );

// 장바구니 상품 삭제 API
router.delete('/api/carts/:productId', );

// 장바구니 상품 전체 삭제 API
router.delete('/api/carts', );


module.exports = router;