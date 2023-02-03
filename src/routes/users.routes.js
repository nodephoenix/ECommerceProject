"use strict";

const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users.controllers.js");
const usersController = new UsersController();

const authMiddleware = require("../middleware/authMiddleware");

// 마이페이지 API
router.get("/users/mypage", authMiddleware, usersController.userInfo);

// 내 정보 수정 API
router.put("/users/mypage/:id", authMiddleware, usersController.updateUserInfo);

// 로그아웃 API
router.post("/users/logout", authMiddleware, usersController.userLogout);

module.exports = router;
