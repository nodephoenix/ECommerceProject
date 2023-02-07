"use strict";

const UsersRepository = require("../repository/users.repository.js");

class UsersService {
  usersRepository = new UsersRepository();

  // 마이페이지 API
  userInfo = async (userId) => {
    const userInfo = await this.usersRepository.findUserInfo(userId);
    return userInfo;
  };

  // 내 정보 수정 API
  updateUserInfo = async (userId, userName, address, phone) => {
    const updateUserinfo = await this.usersRepository.updateUserInfo(
      userId,
      userName,
      address,
      phone
    );
    return updateUserinfo;
  };

  // 모든 유저 불러오기
  getUsers = async (req, res, next) => {
    return await this.usersRepository.getUsers();
  };
}

module.exports = UsersService;
