"use strict";

const { Cart } = require("../../sequelize/models");

class CartsRepository {
  getCart = async (userId) => {
    const CartData = await Cart.findAll({ where: { user_id: userId } });
    return CartData;
  };

  createCart = async (count, productId, userId) => {
    const createCart = await Cart.create({
      count: count,
      product_id: productId,
      user_id: userId,
    });
    return createCart;
  };

  updateCart = async (count, productId, userId) => {
    const updateCart = await Cart.update(
      { count },
      { where: { product_id: productId, user_id: userId } }
    );
    return updateCart;
  };
}

module.exports = CartsRepository;
