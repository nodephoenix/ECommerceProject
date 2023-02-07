"use strict";
// @ts-check

const CartsController = require("../../../src/controllers/carts.controllers");

let mockCartsService = {
  getCarts: jest.fn(),
  createCart: jest.fn(),
  updateCart: jest.fn(),
  deleteCart: jest.fn(),
  deleteAllCarts: jest.fn(),
};

let mockRequest = {
  body: jest.fn(),
  params: jest.fn(),
};

let mockResponse = {
  status: jest.fn(),
  json: jest.fn(),
};

let cartsController = new CartsController();
cartsController.cartsService = mockCartsService;

describe("carts controller 유닛 테스트", () => {
  /** @type {CartsController} */

  beforeEach(() => {
    jest.resetAllMocks();
    mockResponse.status = jest.fn(() => {
      return mockResponse;
    });
  });

  test("CartsController 인스턴스 생성 테스트", () => {
    expect(cartsController).toBeTruthy();
  });

  test("getCarts 메소드 성공 테스트", async () => {
    const getCartsReturnValue = {
      {
      data: {
          id: 1,
          userName: "5kiran",
          email: "5kiran@gmail.com",
          password: "8c9449cb556c8f8880bbb17b380ce77e665f348c30fe1263f19855ad49e7f5a6e4996a375649a2b67000ebfbce7bcd4707ee2223880d0a85b668ca418c91dd00",
          salt: "1281479203399",
          phone: "010-1234-5678",
          point: 0,
          grade: 0,
          role: 1,
          createdAt: "2023-02-04T08:08:53.000Z",
          updatedAt: "2023-02-04T08:08:53.000Z",
          carts: 
              {
                  id: 2,
                  productName: "모나리자1",
                  category: 1,
                  desc: "레오나르도 다빈치의 명작",
                  price: 30000,
                  image: "https://cdn.jeonguknews.co.kr/news/photo/201602/16245_8930_5919.JPG",
                  status: 0,
                  likes: 0,
                  views: 0,
                  createdAt: "2023-02-04T08:08:53.000Z",
                  updatedAt: "2023-02-04T08:08:53.000Z",
                  Cart: {
                      count: 8,
                      createdAt: "2023-02-04T13:00:01.000Z",
                      updatedAt: "2023-02-05T08:48:17.000Z",
                      product_id: 2,
                      user_id: 1
                  }
              }
      }
    }
}})
mockCartsService.getCarts = jest.fn(() => getCartsReturnValue
  );
  await cartsController.getCarts(mockRequest, mockResponse)
    
    expect(mockCartsService.getCarts).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);

    expect(mockResponse.json).toHaveBeenCalledWith({
      data: postsReturnValue,
  
  });
});
