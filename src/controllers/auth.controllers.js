"use strict";

const AuthService = require("../services/auth.service.js");

class AuthController {
  authService = new AuthService();

  // 회원가입 API
  userRegister = async (req, res, next) => {
    try {
      const { userName, email, password, confirmPassword, phone } = req.body;
      // 비밀번호 일치 여부
      if (password !== confirmPassword) {
        res.status(404).json({ errorMessage: "비밀번호가 일치하지 않습니다." });
      }
      // 비밀번호 유효성 검사 추가 필요 (특수문자, 영문, 숫자를 모두 사용, 8~15자리)
      const user = await this.authService.userRegister(
        userName,
        email,
        password,
        phone
      );
      res.status(201).json({ message: "회원가입이 완료되었습니다." });
    } catch (error) {
      res.status(404).json({ errorMessage: error.errorMessage });
    }
  };
  // 로그인 API
  userLogin = async (req, res, next) => {};
  // 로그아웃 API
  userLogout = async (req, res, next) => {
    this.authService.userLogout(a, b);
  };
}

module.exports = AuthController;
