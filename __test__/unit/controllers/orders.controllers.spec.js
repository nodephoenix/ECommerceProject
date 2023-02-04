"use strict";
const { default: JestHasteMap } = require("jest-haste-map");
const { default: test } = require("node:test");
// @ts-check

const OrdersController = require("../../../src/controllers/orders.controllers");

describe("orders controller 유닛 테스트", () => {
  /** @type {OrdersController} */
  let ordersController;
  beforeEach(() => {
    ordersController = new OrdersController();

    const Request = {
      params: jest.fn(),
      body: jest.fn(),
    };
    
    const Response = {
      status: jest.fn(()=> Response ),
      json: jest.fn(),
      locals: jest.fn(),
    };
  });

  test("OrdersController 인스턴스 생성 테스트", () => {  
    expect(ordersController).toBeTruthy();
    
  });

  test("OrdersController 나의 주문 이력 조회 테스트", async () => {
    await ordersController.myOrdersList()
    expect(res.status).toBeCalledWith(200)
    expect(res.json).toBeCalledWith()
  });
});
