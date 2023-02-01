"use strict";

const CartsRepository = require("../repository/carts.repository.js");

class CartsService {
  cartsRepository = new CartsRepository();

}

module.exports = CartsService;