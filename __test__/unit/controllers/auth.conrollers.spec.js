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
});

describe("auth controller", () => {
  test("인스턴스 생성", () => {
    expect(authController).toBeTruthy();
  });
});
