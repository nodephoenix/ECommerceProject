"use strict";

const CartsRepository = require("../repository/carts.repository.js");

class CartsService {
  cartsRepository = new CartsRepository();
  async getCarts(userId) {
    const carts = await this.cartsRepository.getCarts(userId);
    return carts;
  }
}

module.exports = CartsService;
