"use strict";
// @ts-check

/** @typedef {import('../../../src/repository/carts.repository')} CartsRepositoryType */
// CartsController 내부에서 생성되어 들어가는 서비스 클래스
// 서비스 클래스를 모킹화하여 실제 서비스가 안 들어가도록 한다.
/** @type {jest.MockInstance<CartsRepositoryType>} */
const CartsRepository = require("../../../src/repository/carts.repository");
const CartsService = require("../../../src/services/carts.service");
jest.mock("../../../src/repository/carts.repository");

/** @type {CartsService} */
let cartsService;
/** @type {jest.Mocked<CartsRepositoryType>} */
let cartsRepository;
beforeEach(() => {
  CartsRepository.mockClear();
  cartsService = new CartsService();
  cartsRepository = cartsService.cartsRepository;
  cartsRepository.addCart = jest.fn();
  cartsRepository.createCart = jest.fn();
  cartsRepository.deleteAllCarts = jest.fn();
  cartsRepository.deleteCart = jest.fn();
  cartsRepository.getCartOne = jest.fn();
  cartsRepository.getCarts = jest.fn();
  cartsRepository.updateCart = jest.fn();
});

describe("CartsService", () => {
  test("create Instance of CartsService", () => {
    expect(cartsService).toBeTruthy();
  });
});

describe("CartsService.getCarts", () => {
  test("method exist", () => {
    expect(cartsService.getCarts).toBeTruthy();
  });

  test("method success", () => {
    const userId = 3;
    const cartData = [];
    cartsRepository.getCarts.mockResolvedValue(cartData);
    expect(cartsService.getCarts(userId)).resolves.toStrictEqual(cartData);
  });
});

describe("CartsService.getCartOne", () => {
  test("method exist", () => {
    expect(cartsService.getCartOne).toBeTruthy();
  });

  test("method success", () => {
    const productId = "2";
    const userId = 3;
    const cartOneData = {};
    cartsRepository.getCartOne.mockResolvedValue(cartOneData);
    expect(cartsService.getCartOne(productId, userId)).resolves.toStrictEqual(
      cartOneData
    );
  });
});

describe("CartsService.createCart", () => {
  test("method exist", () => {
    expect(cartsService.createCart).toBeTruthy();
  });

  test("method success", () => {
    const count = 3;
    const productId = "2";
    const userId = 3;
    const createCart = {};
    cartsRepository.createCart.mockResolvedValue(createCart);
    expect(
      cartsService.createCart(count, productId, userId)
    ).resolves.toStrictEqual(createCart);
  });
});

describe("CartsService.addCart", () => {
  test("method exist", () => {
    expect(cartsService.addCart).toBeTruthy();
  });

  test("method success", () => {
    const count = 3;
    const productId = "2";
    const userId = 3;
    const addCart = {};
    cartsRepository.addCart.mockResolvedValue(addCart);
    expect(
      cartsService.addCart(count, productId, userId)
    ).resolves.toStrictEqual(addCart);
  });
});

describe("CartsService.updateCart", () => {
  test("method exist", () => {
    expect(cartsService.updateCart).toBeTruthy();
  });

  test("method success", () => {
    const count = 3;
    const productId = "2";
    const userId = 3;
    const updateCart = {};
    cartsRepository.updateCart.mockResolvedValue(updateCart);
    expect(
      cartsService.updateCart(count, productId, userId)
    ).resolves.toStrictEqual(updateCart);
  });
});

describe("CartsService.deleteCart", () => {
  test("method exist", () => {
    expect(cartsService.deleteCart).toBeTruthy();
  });

  test("method success", () => {
    const productId = "2";
    const userId = 3;
    const deleteCart = {};
    cartsRepository.deleteCart.mockResolvedValue(deleteCart);
    expect(cartsService.deleteCart(productId, userId)).resolves.toStrictEqual(
      deleteCart
    );
  });
});

describe("CartsService.deleteAllCarts", () => {
  test("method exist", () => {
    expect(cartsService.deleteAllCarts).toBeTruthy();
  });

  test("method success", () => {
    const userId = 3;
    const deleteAllCarts = {};
    cartsRepository.deleteAllCarts.mockResolvedValue(deleteAllCarts);
    expect(cartsService.deleteAllCarts(userId)).resolves.toStrictEqual(
      deleteAllCarts
    );
  });
});
