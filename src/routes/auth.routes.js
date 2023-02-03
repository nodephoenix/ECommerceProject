"use strict";

const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const AuthController = require("../controllers/auth.controllers.js");
const authController = new AuthController();

// 회원가입 API
router.post("/auth/register", authController.userRegister);

// 로그인 API
router.post("/auth/login", authController.userLogin);

// 로그아웃 API
router.post("/auth/logout", authController.userLogout);

module.exports = router;
