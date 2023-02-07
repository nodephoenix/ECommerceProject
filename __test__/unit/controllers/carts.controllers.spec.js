"use strict";
// @ts-check

/** @typedef {import('../../../src/services/carts.service')} CartsServiceType */
// CartsController 내부에서 생성되어 들어가는 서비스 클래스
// 서비스 클래스를 모킹화하여 실제 서비스가 안 들어가도록 한다.
/** @type {jest.MockInstance<CartsServiceType>} */
const CartsService = require("../../../src/services/carts.service");
const CartsController = require("../../../src/controllers/carts.controllers");
jest.mock("../../../src/services/carts.service");

const mockRequest = require("../../mock/request.mock");
const mockResponse = require("../../mock/response.mock");

/** @type {CartsController} */
let cartsController;
/** @type {jest.Mocked<CartsServiceType>} */
let cartsService;
beforeEach(() => {
  CartsService.mockClear();
  cartsController = new CartsController();
  cartsService = cartsController.cartsService;
  cartsService.getCarts = jest.fn();
  cartsService.getCartOne = jest.fn();
  cartsService.createCart = jest.fn();
  cartsService.addCart = jest.fn();
  cartsService.updateCart = jest.fn();
  cartsService.deleteCart = jest.fn();
  cartsService.deleteAllCarts = jest.fn();
});

describe("CartsController", () => {
  test("create instance", () => {
    expect(cartsController).toBeTruthy();
  });
});

describe("cartsController.getCarts", () => {
  test("200 Response - 전체 상품 조회 성공", async () => {
    const req = mockRequest();
    const res = mockResponse({
      locals: {
        user: {
          id: 2,
        },
      },
    });
    const mockCartData = [];
    cartsService.getCarts.mockResolvedValue(mockCartData);
    await cartsController.getCarts(req, res);

    expect(cartsService.getCarts).toHaveBeenCalledWith(res.locals.user.id);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ data: mockCartData });
  });

  test("404 Response - 전체 상품 조회 실패", async () => {
    const req = mockRequest();
    const res = mockResponse({
      locals: {
        user: {
          id: 2,
        },
      },
    });

    const errorMessage = "상품 조회에 실패했습니다.";
    cartsService.getCarts.mockRejectedValue(new Error(errorMessage));
    await cartsController.getCarts(req, res);

    expect(cartsService.getCarts).toHaveBeenCalledWith(res.locals.user.id);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ errorMessage: errorMessage });
  });
});

describe("cartsController.createCart", () => {
  test("200 Response - 장바구니 상품 추가", async () => {
    const req = mockRequest({
      params: {
        productId: "3",
      },
      body: {
        count: 3,
      },
    });
    const res = mockResponse({
      locals: {
        user: {
          id: 2,
        },
      },
    });
    cartsService.getCartOne.mockResolvedValue(null);
    await cartsController.createCart(req, res);

    expect(cartsService.getCartOne).toHaveBeenCalledWith(
      req.params.productId,
      res.locals.user.id
    );
    expect(cartsService.createCart).toHaveBeenCalledWith(
      req.body.count,
      req.params.productId,
      res.locals.user.id
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "장바구니 상품이 추가되었습니다.",
    });
  });

  test("200 Response - 장바구니 상품 수량이 변경", async () => {
    const req = mockRequest({
      params: {
        productId: "3",
      },
      body: {
        count: 3,
      },
    });
    const res = mockResponse({
      locals: {
        user: {
          id: 2,
        },
      },
    });
    const existCartData = {
      dataValues: {
        product_id: 3,
      },
    };
    cartsService.getCartOne.mockResolvedValue(existCartData);
    await cartsController.createCart(req, res);

    expect(cartsService.getCartOne).toHaveBeenCalledWith(
      req.params.productId,
      res.locals.user.id
    );
    expect(cartsService.addCart).toHaveBeenCalledWith(
      req.body.count,
      req.params.productId,
      res.locals.user.id
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "장바구니 상품 수량이 변경되었습니다.",
    });
  });

  test("404 Response - 장바구니 상품 추가 실패", async () => {
    const req = mockRequest({
      params: {
        productId: "3",
      },
      body: {
        count: 3,
      },
    });
    const res = mockResponse({
      locals: {
        user: {
          id: 2,
        },
      },
    });
    const errorMessage = "에러가 발생했습니다.";
    cartsService.getCartOne.mockRejectedValue(
      new Error("에러가 발생했습니다.")
    );
    await cartsController.createCart(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      errorMessage,
    });
  });
});

describe("cartsController.updateCart", () => {
  test.skip("메소드 존재", () => {
    expect(cartsController.updateCart).toBeTruthy();
  });

  test("200 Response - 성공", async () => {
    const req = mockRequest({
      params: {
        productId: "3",
      },
      body: {
        count: 3,
      },
    });
    const res = mockResponse({
      locals: {
        user: {
          id: 2,
        },
      },
    });
    await cartsController.updateCart(req, res);

    expect(cartsService.updateCart).toHaveBeenCalledWith(
      req.body.count,
      req.params.productId,
      res.locals.user.id
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "담은 상품 수량이 변경되었습니다.",
    });
  });

  test("400 Response - 실패", async () => {
    const req = mockRequest({
      params: {
        productId: "3",
      },
      body: {
        count: 3,
      },
    });
    const res = mockResponse({
      locals: {
        user: {
          id: 2,
        },
      },
    });
    const errorMessage = "에러가 발생했습니다.";
    cartsService.updateCart.mockRejectedValue(new Error(errorMessage));
    await cartsController.updateCart(req, res);

    expect(cartsService.updateCart).toHaveBeenCalledWith(
      req.body.count,
      req.params.productId,
      res.locals.user.id
    );
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      errorMessage,
    });
  });
});

describe("cartsController.deleteCart", () => {
  test("메소드 존재", () => {
    expect(cartsController.deleteCart).toBeTruthy();
  });

  test("200 Response - 성공", async () => {
    const req = mockRequest({
      params: {
        productId: "2",
      },
    });
    const res = mockResponse({
      locals: {
        user: {
          id: 2,
        },
      },
    });
    await cartsController.deleteCart(req, res);

    expect(cartsService.deleteCart).toHaveBeenCalledWith(
      req.params.productId,
      res.locals.user.id
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "장바구니 상품을 삭제했습니다.",
    });
  });

  test("400 Response - 실패", async () => {
    const req = mockRequest({
      params: {
        productId: "2",
      },
    });
    const res = mockResponse({
      locals: {
        user: {
          id: 2,
        },
      },
    });
    const errorMessage = "에러가 발생했습니다.";
    cartsService.deleteCart.mockRejectedValue(new Error(errorMessage));
    await cartsController.deleteCart(req, res);

    expect(cartsService.deleteCart).toHaveBeenCalledWith(
      req.params.productId,
      res.locals.user.id
    );
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      errorMessage,
    });
  });
});

describe("cartsController.deleteAllCarts", () => {
  test("메소드 존재", () => {
    expect(cartsController.deleteAllCarts).toBeTruthy();
  });

  test("200 Response - 성공", async () => {
    const req = mockRequest();
    const res = mockResponse({
      locals: {
        user: {
          id: 2,
        },
      },
    });
    await cartsController.deleteAllCarts(req, res);

    expect(cartsService.deleteAllCarts).toHaveBeenCalledWith(
      res.locals.user.id
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "장바구니 상품을 전체 삭제했습니다.",
    });
  });

  test("400 Response - 실패", async () => {
    const req = mockRequest();
    const res = mockResponse({
      locals: {
        user: {
          id: 2,
        },
      },
    });
    const errorMessage = "에러가 발생했습니다.";
    cartsService.deleteAllCarts.mockRejectedValue(new Error(errorMessage));
    await cartsController.deleteAllCarts(req, res);

    expect(cartsService.deleteAllCarts).toHaveBeenCalledWith(
      res.locals.user.id
    );
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      errorMessage,
    });
  });
});
