"use strict";
// @ts-check

const OrdersController = require("../../../src/controllers/orders.controllers");

describe("orders controller 유닛 테스트", () => {
  /** @type {OrdersController} */
  let ordersController;
  beforeEach(() => {
    ordersController = new OrdersController();
  });

  test("OrdersController 인스턴스 생성 테스트", () => {
    expect(ordersController).toBeTruthy();
  });
});
