"use strict";

const { User } = require("../../sequelize/models");

class AuthRepository {
  // 회원가입
  userRegister = async (userName, email, password, phone, salt, address) => {
    const userData = await User.create({
      userName,
      email,
      password,
      phone,
      salt,
      address,
    });
    return userData;
  };

  // 로그인
  findUser = async (email) => {
    try {
      const user = await User.findOne({ where: { email } });
      return user;
    } catch {
      throw new Error();
    }
  };
}

module.exports = AuthRepository;
