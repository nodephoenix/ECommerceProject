"use strict";

const user = require("../../sequelize/models/user.js");
const AuthRepository = require("../repository/auth.repository.js");
const crypto = require("crypto");

class AuthService {
  authRepository = new AuthRepository();

  // 회원가입 API
  userRegister = async (userName, email, password, phone) => {
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
      salt
    );
    return {
      id: userData.null,
      userName: userData.userName,
      email: userData.email,
      password: userData.hashPassword,
      salt: userData.salt,
      phone: userData.phone,
    };
  };

  // 로그인 API
  userLogin = async (email, password) => {
    const login = await this.authRepository.userLogin(email);
    const { password: dbPassword, salt } = user;

    const hashPassword = crypto
      .createHash("sha512")
      .update(password + salt)
      .digest("hex");
    // 입력한 비밀번호와 저장된 비밀번호가 같은지 확인
    if (dbPassword !== hashPassword) {
      throw new Error("이메일 또는 비밀번호 확인해주세요");
    }

    if (dbPassword === hashPassword) {
      // jwt 토큰 생성
      const token = jwt.sign({ id: user.userId }, process.env.JWT_SECRET_KEY, {
        algorithm: "HS256", // 해싱 알고리즘
        expiresIn: process.env.JWT_EXPIRES_IN, // 토큰 유효 기간
        issuer: "issuer", // 발행자
      });
    }
    return {
      userId: login.id,
      email: login.email,
      password: login.hashPassword,
      salt: login.salt,
    };
  };
}
module.exports = AuthService;
