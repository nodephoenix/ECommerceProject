"use strict";

const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users.controllers.js");
const usersController = new UsersController();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// 마이페이지 API x
router.get("/users/mypage", authMiddleware, usersController.userInfo);

// 내 정보 수정 API x
router.put("/users/mypage", authMiddleware, usersController.updateUserInfo);

// 유저 전체 불러오기
router.get(
  "/users/list",
  authMiddleware,
  adminMiddleware,
  usersController.getUsers
);

// 로그아웃 API x
router.post("/users/logout", authMiddleware, usersController.userLogout);

module.exports = router;
