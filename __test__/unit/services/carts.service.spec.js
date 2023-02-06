"use strict";
// @ts-check

const CartsService = require("../../../src/services/carts.service");

describe("carts service 유닛 테스트", () => {
  /** @type {CartsService} */
  let cartsService;
  beforeEach(() => {
    cartsService = new CartsService();
  });

  test("CartsService 인스턴스 생성 테스트", () => {
    expect(cartsService).toBeTruthy();
  });
});
