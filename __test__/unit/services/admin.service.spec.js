"use strict";
// @ts-check
/** @typedef {import('../../../src/repository/admin.repository')} AdminRepositoryType */
// AdminController 내부에서 생성되어 들어가는 서비스 클래스
// 서비스 클래스를 모킹화하여 실제 서비스가 안 들어가도록 한다.
/** @type {jest.MockInstance<AdminRepositoryType>} */
const AdminRepository = require("../../../src/repository/admin.repository");
const AdminService = require("../../../src/services/admin.service");
jest.mock("../../../src/repository/admin.repository");

/** @type {AdminService} */
let adminService;
/** @type {jest.Mocked<AdminRepositoryType>} */
let adminRepository;
beforeEach(() => {
  AdminRepository.mockClear();
  adminService = new AdminService();
  adminRepository = adminService.adminRepository;
  adminRepository.deleteProducts = jest.fn();
  adminRepository.editProducts = jest.fn();
  adminRepository.getOrderProducts = jest.fn();
  adminRepository.putProductsStatus = jest.fn();
  adminRepository.putUserGrade = jest.fn();
  adminRepository.registerProducts = jest.fn();
});

describe("AdminService", () => {
  test("create Instance of AdminService", () => {
    expect(adminService).toBeTruthy();
  });
});

describe("AdminService.registerProducts", () => {
  test("method exist", () => {
    expect(adminService.registerProducts).toBeTruthy();
  });

  test("method success", () => {
    const body = {
      productName: "모나리자",
      desc: "모나리자입니다",
      price: 10000,
      image: "/image.png",
    };
    adminRepository.registerProducts.mockResolvedValue(true);
    expect(adminService.registerProducts(body)).resolves.toBe(true);
  });
});

describe("AdminService.editProducts", () => {
  test("method exist", () => {
    expect(adminService.editProducts).toBeTruthy();
  });

  test("method success", () => {
    const body = {
      productName: "모나리자",
      desc: "모나리자입니다",
      price: 10000,
      image: "/image.png",
    };
    adminRepository.editProducts.mockResolvedValue(true);
    expect(adminService.editProducts(body)).resolves.toBe(true);
  });
});

describe("AdminService.deleteProducts", () => {
  test("method exist", () => {
    expect(adminService.deleteProducts).toBeTruthy();
  });

  test("method success", () => {
    adminRepository.deleteProducts.mockResolvedValue(true);
    expect(adminService.deleteProducts(1)).resolves.toBe(true);
  });
});

describe("AdminService.getOrderProducts", () => {
  test("method exist", () => {
    expect(adminService.getOrderProducts).toBeTruthy();
  });

  test("method success", () => {
    const data = [];
    adminRepository.getOrderProducts.mockResolvedValue([]);
    expect(adminService.getOrderProducts()).resolves.toStrictEqual([]);
  });
});

describe("AdminService.putProductsStatus", () => {
  test("method exist", () => {
    expect(adminService.putProductsStatus).toBeTruthy();
  });

  test("method success", () => {
    adminRepository.putProductsStatus.mockResolvedValue(true);
    expect(adminService.putProductsStatus(1, 1)).resolves.toBe(true);
  });
});

describe("AdminService.putUserGrade", () => {
  test("method exist", () => {
    expect(adminService.putUserGrade).toBeTruthy();
  });

  test("method success", () => {
    adminRepository.putUserGrade.mockResolvedValue(true);
    expect(adminService.putUserGrade(1, 1)).resolves.toBe(true);
  });
});

