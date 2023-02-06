"use strict";
// @ts-check

const OrdersService = require("../../../src/services/orders.service");

let mockOrdersRepository = {
  createOrder: jest.fn(),
  createOrderDetail: jest.fn(),
  myCart: jest.fn(),
  clearCart: jest.fn(),
  cancelOrder: jest.fn(),
  orderStatusChange: jest.fn(),
  orderList: jest.fn(),
  orderDetail: jest.fn(),
};

let ordersService = new OrdersService();
ordersService.ordersRepository = mockOrdersRepository;

describe("orders service 유닛 테스트", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("OrdersService orderArt Method by Success", async () => {
    const createOrderReturnValue = {
      id: 1,
      status: 0,
      user_id: 1,
      updatedAt: new Date("11 October 2022 00:00"),
      createdAt: new Date("11 October 2022 00:00"),
    };
    const orderDetailReturnValue = {
      count: 2,
      order_id: createOrderReturnValue.id,
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
    mockOrdersRepository.createOrder = jest.fn(() => {
      return createOrderReturnValue;
    });

    mockOrdersRepository.createOrderDetail = jest.fn(() => {
      return orderDetailReturnValue;
    });
    const orderArt = await ordersService.orderArt(1, 1, 2);

    // 1. createOrder Method가 1번 호출된다. 입력받는 인자는 userId 이다.
    expect(mockOrdersRepository.createOrder).toHaveBeenCalledTimes(1);
    expect(mockOrdersRepository.createOrder).toHaveBeenCalledWith(1);

    // 2. createOrderDetail Method가 1번 호출된다. 입력받는 인자는 createOrder.id, productId, count 이다.
    expect(mockOrdersRepository.createOrderDetail).toHaveBeenCalledTimes(1);
    expect(mockOrdersRepository.createOrderDetail).toHaveBeenCalledWith(
      createOrderReturnValue.id,
      1,
      2
    );

    // 3. orderArt Method의 return 값은 orderArtReturnValue 값과 일치한다.
    expect(orderArt).toEqual(orderArtReturnValue);
  });

  test("OrdersService orderArt Method By Bad Request", async () => {
    const orderArtReturnValue = {
      status: 400,
      message: "잘못된 요청입니다.",
    };

    const orderArt = await ordersService.orderArt(1, 2);

    // 1. orderArt Method가 전달 받는 인자는 userId, productId, count 3개가 아닐 때 예외 처리
    expect(orderArt).toEqual(orderArtReturnValue);
  });

  test("OrdersService orderArt Method By Error", async () => {
    const orderArtReturnValue = new Error();
    mockOrdersRepository.createOrder = jest.fn(() => {
      return new Error();
    });

    mockOrdersRepository.createOrderDetail = jest.fn(() => {
      return new Error();
    });
    try {
      const orderArt = await ordersService.orderArt(1, 1, 2);
    } catch {
      expect(orderArt).toEqual(orderArtReturnValue);
    }
  });

  test("OrdersService orderCart Method By Success", async () => {
    const myCartReturnValue = [
      {
        count: 2,
        updatedAt: new Date("11 October 2022 00:00"),
        createdAt: new Date("11 October 2022 00:00"),
        product_id: 2,
        user_id: 1,
      },
      {
        count: 2,
        updatedAt: new Date("11 October 2022 00:00"),
        createdAt: new Date("11 October 2022 00:00"),
        product_id: 1,
        user_id: 1,
      },
    ];
    const createOrderReturnValue = {
      id: 1,
      status: 0,
      user_id: 1,
      updatedAt: new Date("11 October 2022 00:00"),
      createdAt: new Date("11 October 2022 00:00"),
    };
    const myCartDetailReturnValue = await myCartReturnValue.map((detail) => ({
      count: detail.count,
      order_id: createOrderReturnValue.id,
      product_id: detail.product_id,
    }));

    const myCartDetailReturnValueLength = myCartDetailReturnValue.length;

    const orderCartReturnValue = {
      data: myCartDetailReturnValue,
      status: 201,
      message: "장바구니 주문이 완료되었습니다",
    };

    mockOrdersRepository.myCart = jest.fn(() => {
      return myCartReturnValue;
    });

    mockOrdersRepository.createOrder = jest.fn(() => {
      return createOrderReturnValue;
    });

    const orderCart = await ordersService.orderCart(1);

    // 1. myCart Method가 1번 호출된다. 입력받는 인자는 userId 이다.
    expect(mockOrdersRepository.myCart).toHaveBeenCalledTimes(1);
    expect(mockOrdersRepository.myCart).toHaveBeenCalledWith(1);

    // 2. createOrder Method가 1번 호출된다. 입력받는 인자는 userId 이다.
    expect(mockOrdersRepository.createOrder).toHaveBeenCalledTimes(1);
    expect(mockOrdersRepository.createOrder).toHaveBeenCalledWith(1);

    // 3. createOrderDetail Method가 myCartDetailReturnValue의 길이만큼 호출된다.
    expect(mockOrdersRepository.createOrderDetail).toHaveBeenCalledTimes(
      myCartDetailReturnValueLength
    );

    // 4. clearCart Method가 1번 호출된다.
    expect(mockOrdersRepository.clearCart).toHaveBeenCalledTimes(1);

    // 5. orderCart의 return 값은 orderCartReturnValue 값과 일치한다.
    expect(orderCart).toEqual(orderCartReturnValue);
  });

  test("OrdersService orderCart Method By Bad Request", async () => {
    const myCartReturnValue = [];

    const orderCartReturnValue = {
      status: 400,
      message: "장바구니에 상품이 존재하지 않습니다",
    };

    mockOrdersRepository.myCart = jest.fn(() => {
      return myCartReturnValue;
    });

    const orderCart = await ordersService.orderCart(1);

    // 1. myCart Method가 1번 호출된다. 입력받는 인자는 userId 이다.
    expect(mockOrdersRepository.myCart).toHaveBeenCalledTimes(1);
    expect(mockOrdersRepository.myCart).toHaveBeenCalledWith(1);

    // 2. myCart Method의 return 값이 빈 배열이면 orderCartReturnValue 값과 일치한다.
    expect(orderCart).toEqual(orderCartReturnValue);
  });

  test("OrdersService orderCart Method By Error", async () => {
    const orderCartReturnValue = new Error();
    mockOrdersRepository.myCart = jest.fn(() => {
      return new Error();
    });

    try {
      const orderCart = await ordersService.orderCart(1);
    } catch {
      expect(orderCart).toEqual(orderCartReturnValue);
    }
  });

  // test("OrdersService cancelOrder Method By Success", async () => {
  //   const cancelOrderReturnValue = {
  //     status: 400,
  //     message: "주문을 취소할 수 없습니다.",
  //   };

  //   mockOrdersRepository.orderStatusChange = jest.fn(() => {
  //     return 1;
  //   });

  //   const cancelOrder = await ordersService.cancelOrder(1, 1);

  //   // 1. myCart Method가 1번 호출된다. 입력받는 인자는 order_id, user_id 이다.
  //   expect(mockOrdersRepository.orderStatusChange).toHaveBeenCalledTimes(1);
  //   expect(mockOrdersRepository.orderStatusChange).toHaveBeenCalledWith(1, 1);

  //   // 2. cancelOrder Method의 return 값이 0이 아니면 cancelOrderReturnValue 값과 일치한다.
  //   expect(cancelOrder).toEqual(cancelOrderReturnValue);
  // });

  test("OrdersService cancelOrder Method By Bad Request", async () => {
    const cancelOrderReturnValue = {
      status: 400,
      message: "주문을 취소할 수 없습니다.",
    };

    mockOrdersRepository.orderStatusChange = jest.fn(() => {
      return 1;
    });

    const cancelOrder = await ordersService.cancelOrder(1, 1);

    // 1. myCart Method가 1번 호출된다. 입력받는 인자는 order_id, user_id 이다.
    expect(mockOrdersRepository.orderStatusChange).toHaveBeenCalledTimes(1);
    expect(mockOrdersRepository.orderStatusChange).toHaveBeenCalledWith(1, 1);

    // 2. cancelOrder Method의 return 값이 0이 아니면 cancelOrderReturnValue 값과 일치한다.
    expect(cancelOrder).toEqual(cancelOrderReturnValue);
  });
});
