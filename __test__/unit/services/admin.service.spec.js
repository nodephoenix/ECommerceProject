"use strict";
// @ts-check
/** @typedef {import('../../../src/repository/admin.repository')} AdminRepositoryType */
// AdminController 내부에서 생성되어 들어가는 서비스 클래스
// 서비스 클래스를 모킹화하여 실제 서비스가 안 들어가도록 한다.
/** @type {jest.MockInstance<AdminRepositoryType>} */
const AdminRepository = require("../../../src/repository/admin.repository");
const AdminService = require("../../../src/services/admin.service");
jest.mock("../../../src/repository/admin.repository");

describe("admin service 유닛 테스트", () => {
  /** @type {AdminService} */
  let adminService;
  /** @type {jest.Mocked<AdminRepositoryType>} */
  let adminRepository;
  beforeEach(() => {
    AdminRepository.mockClear();
    adminService = new AdminService();
    adminRepository = adminService.adminRepository;
  });

  test("AdminService 인스턴스 생성 테스트", () => {
    expect(adminService).toBeTruthy();
  });

  test("registerProducts 메소드 성공", async () => {
    const body = {
      productName: "모나리자",
      desc: "모나리자입니다",
      price: 10000,
      image: "image.png",
    };
    adminRepository.registerProducts = jest.fn().mockResolvedValue(true);
    const returnValue = await adminService.registerProducts(body);

    expect(returnValue).toBe(true);
  });

  test("editProducts 메소드 성공", async () => {
    adminRepository.editProducts = jest.fn().mockResolvedValue(true);
    const returnValue = await adminService.editProducts(1, {
      productName: "모나리자",
      desc: "모나리자입니다",
      price: 10000,
      image: "image.png",
    });

    expect(returnValue).toBe(true);
  });

  test("deleteProducts 메소드 성공", async () => {
    const body = {
      productName: "모나리자",
      desc: "모나리자입니다",
      price: 10000,
      image: "image.png",
    };
    adminRepository.deleteProducts = jest.fn().mockResolvedValue(true);
    const returnValue = await adminService.deleteProducts(1);

    expect(returnValue).toBe(true);
  });

  test("getOrderProducts 메소드 성공", async () => {
    const body = {
      productName: "모나리자",
      desc: "모나리자입니다",
      price: 10000,
      image: "image.png",
    };
    adminRepository.getOrderProducts = jest.fn().mockResolvedValue([]);
    const returnValue = await adminService.getOrderProducts();

    expect(returnValue).toStrictEqual([]);
  });

  test("putProductsStatus 메소드 성공", async () => {
    const body = {
      productName: "모나리자",
      desc: "모나리자입니다",
      price: 10000,
      image: "image.png",
    };
    adminRepository.putProductsStatus = jest.fn().mockResolvedValue(true);
    const returnValue = await adminService.putProductsStatus(1, 1);

    expect(returnValue).toBe(true);
  });

  test("putUserGrade 메소드 성공", async () => {
    const body = {
      productName: "모나리자",
      desc: "모나리자입니다",
      price: 10000,
      image: "image.png",
    };
    adminRepository.putUserGrade = jest.fn().mockResolvedValue(true);
    const returnValue = await adminService.putUserGrade(1, 1);

    expect(returnValue).toBe(true);
  });
});
