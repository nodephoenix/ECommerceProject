"use strict";

const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/auth.controllers.js');
const authController = new AuthController();

// 회원가입 API 예시
router.post('/auth/register', authController.userRegister);

// 로그인 API
router.post('/auth/login',);

// 로그아웃 API
router.post('/auth/logout',);


module.exports = router;