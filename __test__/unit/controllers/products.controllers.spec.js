"use strict";
// @ts-check

/** @typedef {import('../../../src/services/products.service')} ProductsServiceType */
// ProductsController 내부에서 생성되어 들어가는 서비스 클래스
// 서비스 클래스를 모킹화하여 실제 서비스가 안 들어가도록 한다.
/** @type {jest.MockInstance<ProductsServiceType>} */
const ProductsService = require("../../../src/services/products.service");
const ProductsController = require("../../../src/controllers/products.controllers");
jest.mock("../../../src/services/products.service");

const mockRequest = require("../../mock/request.mock");
const mockResponse = require("../../mock/response.mock");

/** @type {ProductsController} */
let productsController;
/** @type {jest.Mocked<ProductsServiceType>} */
let productsService;

beforeEach(() => {
  ProductsService.mockClear();
  productsController = new ProductsController();
  productsService = productsController.productsService;
  productsService.getProducts = jest.fn();
  productsService.getProductDetail = jest.fn();
});

describe("ProductController", () => {
  test("인스턴스 생성", () => {
    expect(productsController).toBeTruthy();
  });
});

describe("ProductController.getProducts", () => {
  test("메소드 존재", () => {
    expect(productsController.getProducts).toBeTruthy();
  });

  test("200 Response - 성공", async () => {
    const req = mockRequest();
    const res = mockResponse();
    const productListData = [];
    productsService.getProducts.mockResolvedValue(productListData);
    await productsController.getProducts(req, res);

    expect(productsService.getProducts).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(productListData);
  });

  test("404 Response - 실패", async () => {
    const req = mockRequest();
    const res = mockResponse();
    const errorMessage = "에러가 발생함";
    productsService.getProducts.mockRejectedValue(new Error(errorMessage));
    await productsController.getProducts(req, res);

    expect(productsService.getProducts).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      errorMessage,
    });
  });
});

describe("ProductController.getProductDetail", () => {
  test("메소드 존재", () => {
    expect(productsController.getProductDetail).toBeTruthy();
  });

  test("200 Response - 성공", async () => {
    const req = mockRequest({
      params: {
        productId: "3",
      },
    });
    const res = mockResponse();
    const productDetail = {};
    productsService.getProductDetail.mockResolvedValue(productDetail);
    await productsController.getProductDetail(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(productDetail);
  });

  test("500 Response - 실패", async () => {
    const req = mockRequest({
      params: {
        productId: "3",
      },
    });
    const res = mockResponse();
    const errorMessage = "에러가 발생함";
    productsService.getProductDetail.mockRejectedValue(new Error(errorMessage));
    await productsController.getProductDetail(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ errorMessage });
  });
});
