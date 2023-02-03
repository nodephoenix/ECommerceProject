"use strict";
// @ts-check

const OrdersService = require("../../../src/services/orders.service");

describe("orders service 유닛 테스트", () => {
  /** @type {OrdersService} */
  let ordersService;
  beforeEach(() => {
    ordersService = new OrdersService();
  });

  test("OrdersService 인스턴스 생성 테스트", () => {
    expect(ordersService).toBeTruthy();
  });
});
