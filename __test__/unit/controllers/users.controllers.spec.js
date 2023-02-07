"use strict";
// @ts-check

/** @typedef {import('../../../src/services/users.service')} UsersServiceType */
// UsersController 내부에서 생성되어 들어가는 서비스 클래스
// 서비스 클래스를 모킹화하여 실제 서비스가 안 들어가도록 한다.
/** @type {jest.MockInstance<UsersServiceType>} */
const UsersService = require("../../../src/services/users.service");
const UsersController = require("../../../src/controllers/users.controllers");
jest.mock("../../../src/services/users.service");

const mockRequest = require("../../mock/request.mock");
const mockResponse = require("../../mock/response.mock");

/** @type {UsersController} */
let usersController;
/** @type {jest.Mocked<UsersServiceType>} */
let usersService;
beforeEach(() => {
  UsersService.mockClear();
  usersController = new UsersController();
  usersService = usersController.usersService;
  usersService.userInfo = jest.fn();
  usersService.updateUserInfo = jest.fn();
  usersService.userLogout = jest.fn();
});

describe("UsersController", () => {
  test("create instance", () => {
    expect(usersController).toBeTruthy();
  });
});

describe("UsersController.userInfo", () => {
  test("method exists", () => {
    expect(usersController.userInfo).toBeTruthy();
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
    const userInfo = {};
    usersService.userInfo.mockResolvedValue(userInfo);
    await usersController.userInfo(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      data: userInfo,
    });
  });

  test("403 Response - 실패", async () => {
    const req = mockRequest();
    const res = mockResponse({
      locals: {
        user: {
          id: 2,
        },
      },
    });
    usersService.userInfo.mockRejectedValue(new Error("에러 발생"));
    await usersController.userInfo(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith("권한이 없습니다.");
  });
});

describe("UsersController.updateUserInfo", () => {
  test("method exists", () => {
    expect(usersController.updateUserInfo).toBeTruthy();
  });

  test("200 Response - 성공", async () => {
    const req = mockRequest({
      body: {
        userName: "parkjin",
        email: "parkjin@gmail.com",
        phone: "010-1234-5678",
      },
    });
    const res = mockResponse({
      locals: {
        user: {
          id: 2,
        },
      },
    });
    await usersController.updateUserInfo(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "회원 정보 수정이 완료되었습니다."
    });
  });

  test("403 Response - 실패", async () => {
    const req = mockRequest({
      body: {
        userName: "parkjin",
        email: "parkjin@gmail.com",
        phone: "010-1234-5678",
      },
    });
    const res = mockResponse({
      locals: {
        user: {
          id: 2,
        },
      },
    });
    const errorMessage = "에러 발생";
    usersService.updateUserInfo.mockRejectedValue(new Error(errorMessage));
    await usersController.updateUserInfo(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith("권한이 없습니다.");
  });
});

describe("UsersController.userLogout", () => {
  test("method exists", () => {
    expect(usersController.userLogout).toBeTruthy();
  });

  test("200 Response - 성공", async () => {
    const req = mockRequest();
    const res = mockResponse();
    await usersController.userLogout(req, res);

    expect(res.clearCookie).toHaveBeenCalledWith("x_auth")
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ message: "로그아웃 완료되었습니다." })
  });
});
