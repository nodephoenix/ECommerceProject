"use strict";

const UsersService = require('../services/auth.service.js');

class UsersController {
    usersService = new UsersService();
    
    // 회원가입 API
    userRegister = async (req, res, next) => {
      this.usersService.userRegister(a,b)
    }
}

module.exports = UsersController;