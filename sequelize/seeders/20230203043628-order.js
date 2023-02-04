"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    let datas = [];
    for (let i = 0; i < 5; i++) {
      let obj = {
        id: i + 1,
        status: 0,
        user_id: i + 1,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      datas.push(obj);
    }
    return queryInterface.bulkInsert("orders", datas, {});
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