"use strict";

const CartsService = require("../services/carts.service.js");

class CartsController {
  cartsService = new CartsService();
  async getCarts(req, res) {
    const userId = req.params.userId;
    const carts = await this.cartsService.getCarts(userId);
    res.json(carts);
  }
}

module.exports = CartsController;

// 컨트롤러 => req,res정보를 받아서 필요한 정보를 뽑는다.
// 서비스 => 필요한 정보를 서비스 메소드에 전달하여 원하는 정보를 받는다.
// 리포지토리(데이터베이스 접근)로 userId로 carts 테이블을 조회한다 2. 조회한 정보를 가공 또는 반환
// 역활을 생각하면서 구현
