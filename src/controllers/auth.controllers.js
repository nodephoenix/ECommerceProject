"use strict";

const AuthService = require('../services/auth.service.js');

class AuthController {
    authService = new AuthService();
    
    // 회원가입 API
    userRegister = async (req, res, next) => {
      this.authService.userRegister(a,b)
    }
}

module.exports = AuthController;