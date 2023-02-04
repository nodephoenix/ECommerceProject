"use strict";
const { default: test } = require("node:test");
// @ts-check

const OrdersService = require("../../../src/services/orders.service");

let mockOrdersRepository = {
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
ordersService.ordersRepository = mockOrdersRepository;

describe("orders service 유닛 테스트", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("단일 그림 주문하기 API 성공 테스트", async () => {
    const createOrderReturnValue = {
      id: 1,
      status: 0,
      product_id: 1,
      updatedAt: new Date("11 October 2022 00:00"),
      createdAt: new Date("11 October 2022 00:00"),
    };
    const orderDetailReturnValue = {
      count: 2,
      order_id: 1,
      product_id: 1,
      updatedAt: new Date("11 October 2022 00:00"),
      createdAt: new Date("11 October 2022 00:00"),
    };
    const orderArtReturnValue = {
      data: {
        count: 2,
        order_id: 1,
        product_id: 1,
        updatedAt: new Date("11 October 2022 00:00"),
        createdAt: new Date("11 October 2022 00:00"),
      },
      status: 201,
      message: "주문이 완료되었습니다.",
    };

    exp
  });
});
