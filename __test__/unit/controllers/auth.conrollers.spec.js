"use strict";
// @ts-check

/** @typedef {import('../../../src/services/auth.service')} AuthServiceType */
// AuthController 내부에서 생성되어 들어가는 서비스 클래스
// 서비스 클래스를 모킹화하여 실제 서비스가 안 들어가도록 한다.
/** @type {jest.MockInstance<AuthServiceType>} */
const AuthService = require("../../../src/services/auth.service");
const AuthController = require("../../../src/controllers/auth.controllers");
jest.mock("../../../src/services/auth.service");

const mockRequest = require("../../mock/request.mock");
const mockResponse = require("../../mock/response.mock");

/** @type {AuthController} */
let authController;
/** @type {jest.Mocked<AuthServiceType>} */
let authService;
beforeEach(() => {
  AuthService.mockClear();
  authController = new AuthController();
  authService = authController.authService;
  authService.userRegister = jest.fn();
  authService.userLogin = jest.fn();
});

describe("auth controller", () => {
  test("인스턴스 생성 확인", () => {
    expect(authController).toBeTruthy();
  });
});

describe("AuthController.userRegister", () => {
  test("메소드가 존재하는지 확인", () => {
    expect(authController.userRegister).toBeTruthy();
  });

  test("200 Response", async () => {
    const req = mockRequest({
      body: {
        userName: "testuser",
        email: "testuser@gmail.com",
        password: "test1234yo!",
        confirmPassword: "test1234yo!",
        phone: "010-1234-5678",
        address: '디스이즈 스파르타군'
      },
    });
    const res = mockResponse();
    await authController.userRegister(req, res);

    expect(authService.userRegister).toHaveBeenCalledWith(
      req.body.userName,
      req.body.email,
      req.body.password,
      req.body.phone,
      req.body.address
    );
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "회원가입이 완료되었습니다.",
    });
  });

  test("404 Response - 비밀번호 불일치", async () => {
    const req = mockRequest({
      body: {
        userName: "testuser",
        email: "testuser@gmail.com",
        password: "test1234yo!",
        confirmPassword: "test1234yo!2",
        phone: "010-1234-5678",
        address: '디스이즈 스파르타군'
      },
    });
    const res = mockResponse();
    await authController.userRegister(req, res);

    expect(authService.userRegister).toHaveBeenCalledTimes(0);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "비밀번호가 일치하지 않습니다.",
    });
  });

  test("400 Response - 비밀번호 유효성 검사 통과 실패", async () => {
    const req = mockRequest({
      body: {
        userName: "testuser",
        email: "testuser@gmail.com",
        password: "testpassword",
        confirmPassword: "testpassword",
        phone: "010-1234-5678",
        address: '디스이즈 스파르타군'
      },
    });
    const res = mockResponse();
    await authController.userRegister(req, res);

    expect(authService.userRegister).toHaveBeenCalledTimes(0);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message:
        "비밀번호는 8~15 자리, 특수문자, 영문, 숫자 모두 포함해야 합니다.",
    });
  });
});

describe("AuthController.userLogin", () => {
  test("메소드가 존재하는지 확인", () => {
    expect(authController.userLogin).toBeTruthy();
  });

  test("200 Response - 정상 로그인 처리", async () => {
    const req = mockRequest({
      body: {
        email: "testuser@gmail.com",
        password: "test1234yo!",
      },
    });
    const res = mockResponse();
    const token = "sometoken";

    authService.userLogin.mockResolvedValue(token);

    await authController.userLogin(req, res);

    expect(authService.userLogin).toHaveBeenCalledWith(
      req.body.email,
      req.body.password
    );
    expect(res.cookie).toHaveBeenCalledWith("x_auth", token, {
      httpOnly: true,
      maxAge: 0.5 * 60 * 60 * 1000, // 쿠키 만료 시간 30분
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith("로그인되었습니다.");
  });

  test("400 Response - try catch에 걸림", async () => {
    const req = mockRequest({
      body: {
        email: "testuser@gmail.com",
        password: "test1234yo!",
      },
    });
    const res = mockResponse();
    const errorMessage = "토큰을 만드는데 실패했습니다.";
    authService.userLogin.mockRejectedValue(new Error(errorMessage));
    await authController.userLogin(req, res);

    expect(authService.userLogin).toHaveBeenCalledWith(
      req.body.email,
      req.body.password
    );
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });
});
