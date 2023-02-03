"use strict";
// @ts-check

const AdminController = require("../../../src/controllers/admin.controllers");

describe("admin controller 유닛 테스트", () => {
  /** @type {AdminController} */
  let adminController;
  beforeEach(() => {
    adminController = new AdminController();
  });

  test("AdminController 인스턴스 생성 테스트", () => {
    expect(adminController).toBeTruthy();
  });
});
