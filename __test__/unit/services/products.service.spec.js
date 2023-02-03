"use strict";
// @ts-check

const ProductsService = require("../../../src/services/products.service");

describe("products service 유닛 테스트", () => {
  /** @type {ProductsService} */
  let productsService;
  beforeEach(() => {
    productsService = new ProductsService();
  });

  test("ProductsService 인스턴스 생성 테스트", () => {
    expect(productsService).toBeTruthy();
  });
});
