"use strict";

const UsersService = require('../services/users.service.js');

class UsersController {
    usersService = new UsersService();
    
    // 마이페이지 API
    userInfo = async (req, res, next) => {
      this.usersService.userInfo()
    }
}

module.exports = UsersController;