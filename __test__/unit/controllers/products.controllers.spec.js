"use strict";
// @ts-check

const ProductsController = require("../../../src/controllers/products.controllers");

describe("products controller 유닛 테스트", () => {
  /** @type {ProductsController} */
  let productsController;
  beforeEach(() => {
    productsController = new ProductsController();
  });

  test("ProductsController 인스턴스 생성 테스트", () => {
    expect(productsController).toBeTruthy();
  });
});
