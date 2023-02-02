"use strict";

const { User } = require("../../sequelize/models");

class AuthRepository {
  // 회원가입
  userRegister = async (userName, email, password, phone) => {
    const userData = await User.create({
      userName,
      email,
      password,
      phone,
    });
    return userData;
  };

  // 로그인
  userLogin = async (a, b) => {};

  // 로그아웃
  userLogout = async (a, b) => {};
}

module.exports = AuthRepository;
