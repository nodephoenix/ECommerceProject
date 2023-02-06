"use strict";
// @ts-check

const UsersService = require("../../../src/services/users.service");

describe("users service 유닛 테스트", () => {
  /** @type {UsersService} */
  let usersService;
  beforeEach(() => {
    usersService = new UsersService();
  });

  test("UsersService 인스턴스 생성 테스트", () => {
    expect(usersService).toBeTruthy();
  });
});
