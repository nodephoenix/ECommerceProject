"use strict";

require("dotenv").config("../../.env");
const jwt = require("jsonwebtoken");
const AuthRepository = require("../repository/auth.repository.js");
const crypto = require("crypto");

class AuthService {
  authRepository = new AuthRepository();

  // 회원가입 API
  userRegister = async (userName, email, password, phone, address) => {
    // 비밀번호 암호화를 위한 해시 함수 적용
    const salt = Math.round(new Date().valueOf() * Math.random()) + "";
    const hashPassword = crypto
      .createHash("sha512")
      .update(password + salt)
      .digest("hex");
    const userData = await this.authRepository.userRegister(
      userName,
      email,
      hashPassword,
      phone,
      salt,
      address
    );
    return {
      id: userData.id,
      userName: userData.userName,
      email: userData.email,
      password: userData.hashPassword,
      salt: userData.salt,
      phone: userData.phone,
    };
  };

  // 로그인 API
  userLogin = async (email, password) => {
    try {
      const user = await this.authRepository.findUser(email);
      if (!user) {
        throw new Error("이메일 또는 패스워드를 확인해주세요");
      }
      const { password: dbPassword, salt } = user;

      const hashPassword = crypto
        .createHash("sha512")
        .update(password + salt)
        .digest("hex");
      // 입력한 비밀번호와 저장된 비밀번호가 같은지 확인
      if (dbPassword !== hashPassword) {
        throw new Error("이메일 또는 비밀번호 확인해주세요");
      }

      // jwt 토큰 생성
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
        algorithm: "HS256", // 해싱 알고리즘
        expiresIn: process.env.JWT_EXPIRES_IN, // 토큰 유효 기간
        issuer: "issuer", // 발행자
      });
      return token;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
module.exports = AuthService;
