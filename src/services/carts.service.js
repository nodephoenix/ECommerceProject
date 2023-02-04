"use strict";

const CartsRepository = require("../repository/carts.repository.js");
const ProductsRepository = require("../repository/products.repository.js");

class CartsService {
  cartsRepository = new CartsRepository();

  addCart = async (count, productId, userId) => {
    console.log("확인", count, productId);
    const addCart = await this.cartsRepository.addCart(
      userId,
      productId,
      count
    );
    return addCart;
  };

  getCart = async (userId) => {
    const getCart = await this.cartsRepository.getCart(userId);
    return getCart;
  };
}

module.exports = CartsService;
