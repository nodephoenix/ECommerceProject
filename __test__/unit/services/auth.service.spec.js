"use strict";
// @ts-check

const AuthService = require("../../../src/services/auth.service");

describe("auth service 유닛 테스트", () => {
  /** @type {AuthService} */
  let authService;
  beforeEach(() => {
    authService = new AuthService();
  });

  test("AuthService 인스턴스 생성 테스트", () => {
    expect(authService).toBeTruthy();
  });
});
