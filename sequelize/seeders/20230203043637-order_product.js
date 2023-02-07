"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    let datas = [];
    for (let i = 0; i < 5; i++) {
      let items = [
        {
          count: 1,
          order_id: i + 1,
          product_id: i + 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          count: 2,
          order_id: i + 1,
          product_id: i + 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      datas.push(...items);
    }
    return queryInterface.bulkInsert("order_products", datas, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('order_products', null, {});
  },
};
