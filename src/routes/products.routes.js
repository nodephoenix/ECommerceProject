"use strict";

const express = require('express');
const router = express.Router();

const ProductsController = require('../controllers/products.controllers.js');
const productsController = new ProductsController();

// 전체 상품 목록 조회 API o
router.get('/products', productsController.getProducts);

// 상품 상세 목록 조회 o
router.get('/products/:productId', productsController.getProductDetail);


module.exports = router;