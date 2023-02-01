"use strict";

const UsersRepository = require("../repository/users.repository.js");

class UsersService {
  usersRepository = new UsersRepository();

  // 마이페이지 API
  userInfo = async () => {
    this.usersRepository.userFindByPk()
  };
}

module.exports = UsersService;
