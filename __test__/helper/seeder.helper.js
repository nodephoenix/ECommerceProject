const userSeed = require("../../sequelize/seeders/20230203014824-user");
const productSeed = require("../../sequelize/seeders/20230203024610-product");
const orderSeed = require("../../sequelize/seeders/20230203043628-order");
const orderProductSeed = require("../../sequelize/seeders/20230203043637-order_product");
const cartSeed = require("../../sequelize/seeders/20230203043656-cart");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface) => {
    await userSeed.up(queryInterface);
    await productSeed.up(queryInterface);
    await orderSeed.up(queryInterface);
    await orderProductSeed.up(queryInterface);
    await cartSeed.up(queryInterface);
  },
  down: async (queryInterface) => {
    await userSeed.down(queryInterface);
    await productSeed.down(queryInterface);
    await orderSeed.down(queryInterface);
    await orderProductSeed.down(queryInterface);
    await cartSeed.down(queryInterface);
  },
};
