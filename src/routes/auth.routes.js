"use strict";

const express = require("express");
const router = express.Router();
const indexMiddleware = require("../middleware/index");

const AuthController = require("../controllers/auth.controllers.js");
const authController = new AuthController();

// 회원가입 API
router.post("/auth/register", authController.userRegister);

// 로그인 API
router.post("/auth/login", authController.userLogin);

// 사용자 인증 미들웨어 위치
router.use(indexMiddleware, (req, res, next) => {
  next();
});

// 로그아웃 API
router.post("/auth/logout", authController.userLogout);

module.exports = router;
