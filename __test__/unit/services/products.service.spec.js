"use strict";
// @ts-check

/** @typedef {import('../../../src/repository/products.repository')} ProductsRepositoryType */
// ProductsController 내부에서 생성되어 들어가는 서비스 클래스
// 서비스 클래스를 모킹화하여 실제 서비스가 안 들어가도록 한다.
/** @type {jest.MockInstance<ProductsRepositoryType>} */
const ProductsRepository = require("../../../src/repository/products.repository");
const ProductsService = require("../../../src/services/products.service");
jest.mock("../../../src/repository/products.repository");

/** @type {ProductsService} */
let productsService;
/** @type {jest.Mocked<ProductsRepositoryType>} */
let productsRepository;
beforeEach(() => {
  ProductsRepository.mockClear();
  productsService = new ProductsService();
  productsRepository = productsService.productsRepository;
  productsRepository.getProductDetail = jest.fn();
  productsRepository.getProducts = jest.fn();
});

describe("ProductsService", () => {
  test("create Instance of ProductsService", () => {
    expect(productsService).toBeTruthy();
  });
});

describe("ProductsService.getProducts", () => {
  test("method exist", () => {
    expect(productsService.getProducts).toBeTruthy();
  });

  test("method success", () => {
    const userId = 3;
    const products = [];
    productsRepository.getProducts.mockResolvedValue(products);
    expect(productsService.getProducts(userId)).resolves.toStrictEqual(
      products
    );
  });
});

describe("ProductsService.getProductDetail", () => {
  test("method exist", () => {
    expect(productsService.getProductDetail).toBeTruthy();
  });

  test("method success", () => {
    const productId = 3;
    const productDetail = {};
    productsRepository.getProductDetail.mockResolvedValue(productDetail);
    expect(productsService.getProductDetail(productId)).resolves.toStrictEqual(
      productDetail
    );
  });
});
