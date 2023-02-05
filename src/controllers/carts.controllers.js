"use strict";

const CartsService = require("../services/carts.service.js");

class CartsController {
  cartsService = new CartsService();

  // 장바구니 상품 전체 조회
  getCarts = async (req, res, next) => {
    try {
      const userId = res.locals.user.id;
      const CartData = await this.cartsService.getCarts(userId);
      res.status(200).json({ data: CartData });
    } catch (error) {
      res.status(404).json({ errorMessage: error.message });
    }
  };

  // 장바구니 상품 추가
  createCart = async (req, res, next) => {
    try {
      const userId = res.locals.user.id;
      const { count } = req.body;
      const { productId } = req.params;

      // 장바구니에 같은 상품이 있는지 확인
      const existCartData = await this.cartsService.getCartOne(
        productId,
        userId
      );

      // 같은 상품이 장바구니에 없으면 새로 추가
      if (!existCartData) {
        await this.cartsService.createCart(count, productId, userId);
        return res
          .status(200)
          .json({ message: "장바구니 상품이 추가되었습니다." });
      }
      // 같은 상품이 있으면 기존 상품 수량에서 상품 수량 증가
      if (existCartData.dataValues.product_id == req.params.productId) {
        await this.cartsService.addCart(count, productId, userId);
        res
          .status(200)
          .json({ message: "장바구니 상품 수량이 변경되었습니다." });
      }
    } catch (error) {
      res.status(404).json({ errorMessage: error.message });
    }
  };

  // 상품 상세 페이지에서 상품 수량을 추가
  addCart = async (req, res, next) => {
    try {
      const userId = res.locals.user.id;
      const { count } = req.body;
      const { productId } = req.params;
      await this.cartsService.addCart(count, productId, userId);
      return res
        .status(200)
        .json({ message: "장바구니 상품 수량이 변경되었습니다." });
    } catch (error) {
      res.status(400).json({ errormessage: error.message });
    }
  };

  // 장바구니 페이지에서 상품 수량을 원하는 만큼 지정해서 변경
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

  // 장바구니 단일 상품 삭제
  deleteCart = async (req, res, next) => {
    try {
      const userId = res.locals.user.id;
      const { productId } = req.params;
      await this.cartsService.deleteCart(productId, userId);
      res.status(200).json({ message: "장바구니 상품을 삭제했습니다." });
    } catch (error) {
      res.status(400).json({ errormessage: error.message });
    }
  };

  // 장바구니 전체 상품 삭제
  deleteAllCarts = async (req, res, next) => {
    try {
      const userId = res.locals.user.id;
      await this.cartsService.deleteAllCarts(userId);
      res.status(200).json({ message: "장바구니 상품을 전체 삭제했습니다." });
    } catch (error) {
      res.status(400).json({ errormessage: error.message });
    }
  };
}

module.exports = CartsController;
