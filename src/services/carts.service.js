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

  deleteCart = async (productId, userId) => {
    const deleteCart = await this.cartsRepository.deleteCart(productId, userId);
    return deleteCart;
  };

  deleteAllCarts = async (userId) => {
    const deleteAllCarts = await this.cartsRepository.deleteAllCarts(userId);
    return deleteAllCarts;
  };
}

module.exports = CartsService;
