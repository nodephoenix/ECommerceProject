"use strict";

const UsersRepository = require("../repository/auth.repository.js");

class UsersService {
  usersRepository = new UsersRepository();

  // 회원가입 API
  userRegister = async (a,b) => {
    this.usersRepository.userRegister(a,b)
  };
}

module.exports = UsersService;
