"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    let datas = [];
    for (let i = 0; i < 1; i++) {
      let obj = {
        count: 1,
        order_id: 1,
        product_id: 1,
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
    return queryInterface.bulkInsert("order_products", datas, {});
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
