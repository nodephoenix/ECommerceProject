"use strict";
// @ts-check

const CartsController = require("../../../src/controllers/carts.controllers");

describe("carts controller 유닛 테스트", () => {
  /** @type {CartsController} */
  let cartsController;
  beforeEach(() => {
    cartsController = new CartsController();
  });

  test("CartsController 인스턴스 생성 테스트", () => {
    expect(cartsController).toBeTruthy();
  });
});
