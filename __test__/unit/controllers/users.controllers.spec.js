"use strict";
// @ts-check

const UsersController = require("../../../src/controllers/users.controllers");

describe("users controller 유닛 테스트", () => {
  /** @type {UsersController} */
  let usersController;
  beforeEach(() => {
    usersController = new UsersController();
  });

  test("UsersController 인스턴스 생성 테스트", () => {
    expect(usersController).toBeTruthy();
  });
});
