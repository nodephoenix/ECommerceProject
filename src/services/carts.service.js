"use strict";

const CartsRepository = require("../repository/carts.repository.js");

class CartsService {
  cartsRepository = new CartsRepository();

  getCarts = async (userId) => {
    const CartData = await this.cartsRepository.getCarts(userId);
    return CartData;
  };

  getCartOne = async (productId, userId) => {
    const CartOneData = await this.cartsRepository.getCartOne(
      productId,
      userId
    );
    return CartOneData;
  };

  createCart = async (count, productId, userId) => {
    // 장바구니에 같은 상품이 있는지 확인
    const existCartData = await this.cartsService.getCartOne(productId, userId);

    const createCart = await this.cartsRepository.createCart(
      count,
      productId,
      userId
    );

    return createCart;
  };

  addCart = async (count, productId, userId) => {
    const addCart = await this.cartsRepository.addCart(
      count,
      productId,
      userId
    );
    return addCart;
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
