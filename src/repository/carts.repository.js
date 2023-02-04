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

  deleteCart = async (productId, userId) => {
    const deleteCart = await Cart.destroy({
      where: { product_id: productId, user_id: userId },
    });
    return deleteCart;
  };

  deleteAllCarts = async (userId) => {
    const deleteAllcarts = await Cart.destroy({ where: { user_id: userId } });
    return deleteAllcarts;
  };
}

module.exports = CartsRepository;
