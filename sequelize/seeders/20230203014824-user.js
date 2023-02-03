"use strict";

const crypto = require("crypto");
// 비밀번호 해시 함수
const hashPassword = (password, salt) =>
  crypto
    .createHash("sha512")
    .update(password + salt)
    .digest("hex");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    let datas = [];
    for (let i = 0; i < 1; i++) {
      let obj = {
        userName: "testUser" + i,
        email: "test" + i + "@exapmle.com",
        password: hashPassword("alswn123*", "10"), // 테스트용이라 salt='10'
        salt: "10",
        phone: "010-1234-1234",
        point: 0,
        grade: 0,
        role: 0,
        createdAt: new Date()
          .toISOString()
          .replace(/T/, " ")
          .replace(/\..+/, ""),
        updatedAt: new Date()
          .toISOString()
          .replace(/T/, " ")
          .replace(/\..+/, ""),
      };
      datas.push(obj);
    }
    return queryInterface.bulkInsert("users", datas, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
