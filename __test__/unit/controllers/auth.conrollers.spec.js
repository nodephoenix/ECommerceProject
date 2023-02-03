"use strict";
// @ts-check

const AuthController = require("../../../src/controllers/auth.controllers");

describe("auth controller 유닛 테스트", () => {
  /** @type {AuthController} */
  let authController;
  beforeEach(() => {
    authController = new AuthController();
  });

  test("AuthController 인스턴스 생성 테스트", () => {
    expect(authController).toBeTruthy();
  });
});
