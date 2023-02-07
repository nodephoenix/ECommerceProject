"use strict";

const UsersService = require("../services/users.service.js");
const Status = require("../middleware/status.code.js");

class UsersController {
  usersService = new UsersService();
  code = new Status();

  // 마이페이지 API
  userInfo = async (req, res, next) => {
    try {
      const userId = res.locals.user.id;
      const userInfo = await this.usersService.userInfo(userId);
      res.status(200).json({ data: userInfo });
    } catch {
      res
        .status(this.code.Forbidden().status)
        .json(this.code.Forbidden().message);
    }
  };

  // 내 정보 수정 API
  updateUserInfo = async (req, res, next) => {
    try {
      const userId = res.locals.user.id;
      const { userName, email, phone } = req.body;
      await this.usersService.updateUserInfo(userId, userName, email, phone);
      res.status(200).json({ message: "회원 정보 수정이 완료되었습니다." });
    } catch {
      res
        .status(this.code.Forbidden().status)
        .json(this.code.Forbidden().message);
    }
  };

  // 모든 유저 불러오기
  getUsers = async (req, res, next) => {
    try {
      const userData = await this.usersService.getUsers();
      res.status(200).json({ data: userData });
    } catch {
      res
        .status(this.code.Forbidden().status)
        .json(this.code.Forbidden().message);
    }
  };

  // 로그아웃 API
  userLogout = async (req, res, next) => {
    res.clearCookie("x_auth");
    res.status(200).json({ message: "로그아웃 완료되었습니다." });
  };
}

module.exports = UsersController;
