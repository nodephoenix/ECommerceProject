"use strict";

const CartsService = require('../services/carts.service.js');

class CartsController {
    cartsService = new CartsService();
    
}

module.exports = CartsController;