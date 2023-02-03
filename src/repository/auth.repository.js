"use strict";

const { User } = require("../../sequelize/models");

class AuthRepository {
  // 회원가입
  userRegister = async (userName, email, password, phone, salt) => {
    const userData = await User.create({
      userName,
      email,
      password,
      phone,
      salt,
    });
    return userData;
  };

  // 로그인
  userLogin = async (email) => {
    try{
      const user = await User.findOne({ where: { email } });
      return user
    }
    catch (err) {
    }
  };
}

module.exports = AuthRepository;
