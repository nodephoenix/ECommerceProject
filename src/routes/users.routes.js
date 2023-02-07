"use strict";

const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users.controllers.js");
const usersController = new UsersController();

const authMiddleware = require("../middleware/authMiddleware");

// 마이페이지 API x
router.get("/users/mypage", authMiddleware, usersController.userInfo);

// 내 정보 수정 API x
router.put("/users/mypage", authMiddleware, usersController.updateUserInfo);

// 로그아웃 API x
router.post("/users/logout", authMiddleware, usersController.userLogout);

module.exports = router;
