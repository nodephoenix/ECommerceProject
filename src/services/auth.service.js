"use strict";

const user = require("../../sequelize/models/user.js");
const AuthRepository = require("../repository/auth.repository.js");

class AuthService {
  authRepository = new AuthRepository();

  // 회원가입 API
  userRegister = async (userName, email, password, phone, salt) => {
    const userData = await this.authRepository.userRegister(
      userName,
      email,
      password,
      phone,
      salt
    );
    return {
      id: userData.null,
      userName: userData.userName,
      email: userData.email,
      password: userData.password,
      salt: userData.salt,
      phone: userData.phone,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt,
    };
  };
  // 로그인 API
  userLogin = async (email) => {
    const login = await this.authRepository.userLogin(email);
    return {
      userId: login.id,
      email: login.email,
      password: login.password,
    };
  };
}
module.exports = AuthService;
