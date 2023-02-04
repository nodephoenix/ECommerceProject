"use strict";
const { default: test } = require("node:test");
// @ts-check

const OrdersService = require("../../../src/services/orders.service");

let mockOrdersService = {
  createOrder: jset.fn(),
  createOrderDetail: jset.fn(),
  myCart: jset.fn(),
  clearCart: jset.fn(),
  cancelOrder: jset.fn(),
  orderStatusChange: jset.fn(),
  orderList: jset.fn(),
  orderDetail: jset.fn(),
};

let ordersService = new OrdersService();
ordersService.ordersRepository = mockOrdersService;

describe("orders service 유닛 테스트", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('단일 그림 주문하기 API 성공 테스트', async () => {
    const orderArtReturnValue = {
      data : {
        
      },
      status : 200,
      message: message 
    }
  })
});
