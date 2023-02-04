"use strict";

const CartsRepository = require("../repository/carts.repository.js");
const ProductsRepository = require("../repository/products.repository.js");

class CartsService {
  cartsRepository = new CartsRepository();

  getCart = async (userId) => {
    const getCart = await this.cartsRepository.getCart(userId);
    return getCart;
  };

  createCart = async (count, productId, userId) => {
    const createCart = await this.cartsRepository.createCart(
      count,
      productId,
      userId
    );
    return createCart;
  };

  updateCart = async (count, productId, userId) => {
    const updateCart = await this.cartsRepository.updateCart(
      count,
      productId,
      userId
    );
    return updateCart;
  };
}

module.exports = CartsService;
