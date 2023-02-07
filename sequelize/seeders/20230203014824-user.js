"use strict";

const crypto = require("crypto");
// 비밀번호 해시 함수
const generageSalt = () =>
  String(Math.round(new Date().valueOf() * Math.random()));
const hashPassword = (plain) => {
  const salt = generageSalt();
  const password = crypto
    .createHash("sha512")
    .update(plain + salt)
    .digest("hex");
  return { password, salt };
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    let datas = [
      {
        id: 1,
        userName: "5kiran",
        email: "5kiran@gmail.com",
        password: "5kiran",
        phone: "010-1234-5678",
        address: "전라남도 여수시",
        createdAt: new Date(),
        updatedAt: new Date(),
        role: 1,
      },
      {
        id: 2,
        userName: "minzunim",
        email: "minzunim@gmail.com",
        password: "minzunim",
        address: "서울시 영등포구",
        phone: "010-1234-5678",
        createdAt: new Date(),
        updatedAt: new Date(),
        role: 0,
      },
      {
        id: 3,
        userName: "nilee23",
        email: "nilee23@gmail.com",
        password: "nilee23",
        address: "경상남도 진주시",
        phone: "010-1234-5678",
        createdAt: new Date(),
        updatedAt: new Date(),
        role: 0,
      },
      {
        id: 4,
        userName: "pyoja",
        email: "pyoja@gmail.com",
        password: "pyoja",
        address: "서울시 마포구",
        phone: "010-1234-5678",
        createdAt: new Date(),
        updatedAt: new Date(),
        role: 0,
      },
      {
        id: 5,
        userName: "parkjin",
        email: "parkjin@gmail.com",
        password: "parkjin",
        address: "전라남도 강진군",
        phone: "010-1234-5678",
        createdAt: new Date(),
        updatedAt: new Date(),
        role: 0,
      },
    ];
    return queryInterface.bulkInsert(
      "users",
      datas.map((user) => ({ ...user, ...hashPassword(user.password) })),
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
