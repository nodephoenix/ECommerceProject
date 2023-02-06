"use strict";
// @ts-check

const AdminService = require("../../../src/services/admin.service");

describe("admin service 유닛 테스트", () => {
  /** @type {AdminService} */
  let adminService;
  beforeEach(() => {
    adminService = new AdminService();
  });

  test("AdminService 인스턴스 생성 테스트", () => {
    expect(adminService).toBeTruthy();
  });
});
