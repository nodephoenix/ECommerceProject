"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    let datas = [];
    for (let i = 0; i < 5; i++) {
      let items = [
        {
          count: 1,
          product_id: i + 1,
          user_id: i + 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          count: 3,
          product_id: i + 2,
          user_id: i + 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      datas.push(...items);
    }
    return queryInterface.bulkInsert("carts", datas, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('carts', null, {});
  },
};
