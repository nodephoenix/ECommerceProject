"use strict";

const UsersService = require("../services/users.service.js");

class UsersController {
  usersService = new UsersService();

  // 마이페이지 API
  userInfo = async (req, res, next) => {
    this.usersService.userInfo();
  };
  // 로그아웃 API
}

module.exports = UsersController;
