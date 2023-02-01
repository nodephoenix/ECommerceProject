"use strict";

const express = require('express');
const router = express.Router();

const ProductsController = require('../controllers/products.controllers.js');
const productsController = new ProductsController();

// 전체 상품 목록 조회 API
router.get('/api/products', );

// 상품 상세 목록 조회
router.get('/api/products/:productId',);


module.exports = router;