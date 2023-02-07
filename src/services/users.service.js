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
  updateUserInfo = async (userId, userName, email, phone) => {
    const updateUserinfo = await this.usersRepository.updateUserInfo(
      userId,
      userName,
      email,
      phone
    );
    return updateUserinfo;
  };
}

module.exports = UsersService;
