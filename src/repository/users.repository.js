"use strict";
const { User } = require("../../sequelize/models");

class UsersRepository {
  findUserInfo = async (userId) => {
    const userInfo = await User.findOne({ where: { id: userId } });
    return userInfo;
  };

  updateUserInfo = async (userId, userName, email, phone) => {
    const UpdateUserInfo = await User.update(
      { userName, email, phone },
      { where: { id: userId } }
    );
    return UpdateUserInfo;
  };

  getUsers = async (req, res, next) => {
    return await User.findAll({ raw: true });
  };
}

module.exports = UsersRepository;
