"use strict";
const { Cart } = require("../models");

class CartsRepository {
  async getCarts(userId) {
    const carts = await Cart.findAll({ where: { user_id: userId } });
    return carts;
  }
}

module.exports = CartsRepository;
