"use strict";

const AuthRepository = require("../repository/auth.repository.js");

class AuthService {
  authRepository = new AuthRepository();

  // 회원가입 API
  userRegister = async (a,b) => {
    this.authRepository.userRegister(a,b)
  };
}

module.exports = AuthService;
