"use strict";

const user = require("../../sequelize/models/user.js");
const AuthRepository = require("../repository/auth.repository.js");

class AuthService {
  authRepository = new AuthRepository();

  // 회원가입 API
  userRegister = async (userName, email, password, phone) => {
    const userData = await this.authRepository.userRegister(
      userName,
      email,
      password,
      phone
    );
    return {
      id: userData.null,
      userName: userData.userName,
      email: userData.email,
      password: userData.password,
      phone: userData.phone,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt,
    };
  };
  // 로그인 API
  userLogin = async (a, b) => {
    this.authRepository.userLogin(a, b);
  };
  // 회원가입 API
  userLogout = async (a, b) => {
    this.authRepository.userLogout(a, b);
  };
}
module.exports = AuthService;
