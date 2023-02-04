"use strict";

const { Cart } = require("../../sequelize/models");

class CartsRepository {
  getCart = async (userId) => {
    const CartData = await Cart.findAll({ where: { user_id: userId } });
    return CartData;
  };

  addCart = async (count, productId, userId) => {
    const updateCart = await Cart.update(
      { count },
      { where: { product_id: productId, user_id: userId } }
    );
    console.log("확인", updateCart);
    return updateCart;
  };
}

module.exports = CartsRepository;
