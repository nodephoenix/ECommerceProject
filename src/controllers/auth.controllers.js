"use strict";

const jwt = require("jsonwebtoken");
const { secretKey, option } = require("../../sequelize/config/secretKey.js");
const AuthService = require("../services/auth.service.js");
const crypto = require("crypto");

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

      // 비밀번호 암호화를 위한 해시 함수 적용
      const salt = Math.round(new Date().valueOf() * Math.random()) + "";
      const hashPassword = crypto
        .createHash("sha512")
        .update(password + salt)
        .digest("hex");
      const user = await this.authService.userRegister(
        userName,
        email,
        hashPassword,
        phone,
        salt
      );

      res.status(200).json({ message: "회원가입이 완료되었습니다." });
    } catch (error) {
      res.status(404).json({ errorMessage: error.message });
    }
  };
  // 로그인 API
  userLogin = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await this.authService.userLogin(email);

      // 입력한 비밀번호와 DB에 저장된 비밀번호 같은지 확인

      if (email !== user.email || password !== user.password) {
        return res
          .status(400)
          .json({ message: "이메일 또는 패스워드를 확인해주세요." });
      }

      // jwt 토큰 생성
      const token = jwt.sign({ id: user.userId }, secretKey, option);
      res.cookie("x_auth", token, {
        httpOnly: true,
        maxAge: 0.5 * 60 * 60 * 1000, // 쿠키 만료 시간 30분
      });
      res.status(200).json({ message: "로그인이 완료되었습니다." });
    } catch (error) {
      res.status(400).json({ errorMessage: error.message });
    }
  };
  // 로그아웃 API
  userLogout = async (req, res, next) => {
    res.clearCookie("x_auth");
    return res.status(200).json({ message: "로그아웃 완료되었습니다." });
  };
}

module.exports = AuthController;
