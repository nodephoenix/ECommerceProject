"use strict";

const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/users.controllers.js');
const usersController = new UsersController();

// 마이페이지 API
router.get('/users/mypage', usersController.userInfo);

// 내 정보 수정 API
router.put('/users',);


module.exports = router;