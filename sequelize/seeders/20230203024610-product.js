"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    let datas = [];
    for (let i = 0; i < 1; i++) {
      let obj = {
        productName: "모나리자" + i,
        category: 1,
        desc: "레오나르도 다빈치의 명작",
        price: 30000,
        image:
          "https://cdn.jeonguknews.co.kr/news/photo/201602/16245_8930_5919.JPG",
        status: 0,
        likes: 0,
        views: 0,
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
    return queryInterface.bulkInsert("products", datas, {});
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
