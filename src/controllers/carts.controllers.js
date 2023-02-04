"use strict";

const CartsService = require("../services/carts.service.js");

class CartsController {
  cartsService = new CartsService();

  getCart = async (req, res, next) => {
    try {
      const userId = res.locals.user.id;
      const getCart = await this.cartsService.getCart(userId);
      res.status(200).json({ data: getCart });
    } catch (error) {
      res.status(404).json({ errorMessage: error.message });
    }
  };

  createCart = async (req, res, next) => {
    try {
      const userId = res.locals.user.id;
      const { count } = req.body;
      const { productId } = req.params;
      await this.cartsService.createCart(count, productId, userId);
      res.status(200).json({ message: "장바구니 상품이 추가되었습니다." });
    } catch (error) {
      res.status(404).json({ errorMessage: error.message });
    }
  };

  updateCart = async (req, res, next) => {
    try {
      const userId = res.locals.user.id;
      const { count } = req.body;
      const { productId } = req.params;
      await this.cartsService.updateCart(count, productId, userId);
      return res
        .status(200)
        .json({ message: "담은 상품 수량이 변경되었습니다." });
    } catch (error) {
      res.status(400).json({ errormessage: error.message });
    }
  };

  // 장바구니 상품 제거
}

module.exports = CartsController;
