"use strict";
// @ts-check

/** @typedef {import('../../../src/services/admin.service')} AdminServiceType */
// AdminController 내부에서 생성되어 들어가는 서비스 클래스
// 서비스 클래스를 모킹화하여 실제 서비스가 안 들어가도록 한다.
/** @type {jest.MockInstance<AdminServiceType>} */
const AdminService = require("../../../src/services/admin.service");
const AdminController = require("../../../src/controllers/admin.controllers");
jest.mock("../../../src/services/admin.service");

const mockRequest = (data = {}) => {
  const req = data;
  return req;
};

const mockResponse = (data = {}) => {
  const res = data;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("admin controller 유닛 테스트", () => {
  /** @type {AdminController} */
  let adminController;
  /** @type {jest.Mocked<AdminServiceType>} */
  let adminService;
  beforeEach(() => {
    AdminService.mockReset();
    adminController = new AdminController();
    // 생성된 AdminService mock 인스턴스를 얻는다.
    adminService = AdminService.mock.instances[0];
  });

  test("AdminController 인스턴스 생성 테스트", () => {
    expect(adminController).toBeTruthy();
  });

  test("registerProducts 메소드 성공", async () => {
    const req = mockResponse({
      body: {
        productName: "모나리자",
        desc: "모나리자 그림",
        price: 100000,
      },
      file: {
        filename: "filename",
      },
    });
    const res = mockResponse();
    await adminController.registerProducts(req, res);

    expect(adminService.registerProducts).toHaveBeenCalledWith({
      ...req.body,
      image: req.file.filename,
    });
    expect(adminService.registerProducts).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({
      message: "상품 등록이 완료되었습니다.",
    });
  });

  test("editProducts 메소드 성공", async () => {
    const req = mockRequest({
      params: {
        productId: "1",
      },
      body: {
        productName: "모나리자",
        desc: "모나리자 그림",
        price: 100000,
      },
      file: {
        filename: "filename",
      },
    });
    const res = mockResponse();
    await adminController.editProducts(req, res);

    expect(adminService.editProducts).toHaveBeenCalledWith(
      +req.params.productId,
      {
        ...req.body,
        image: req.file.filename,
      }
    );
    expect(adminService.editProducts).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({
      message: "상품 정보가 변경되었습니다.",
    });
  });

  test("deleteProducts 메소드 성공", async () => {
    const req = mockRequest({
      params: {
        productId: "1",
      },
    });
    const res = mockResponse();
    await adminController.deleteProducts(req, res);

    expect(adminService.deleteProducts).toHaveBeenCalledWith(
      +req.params.productId
    );
    expect(adminService.deleteProducts).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({
      message: "상품을 삭제하였습니다.",
    });
  });

  test("getOrderProducts 메소드 성공", async () => {
    const req = mockRequest();
    const res = mockResponse();
    adminService.getOrderProducts.mockResolvedValue([]);
    await adminController.getOrderProducts(req, res);

    expect(adminService.getOrderProducts).toHaveBeenCalledWith();
    expect(adminService.getOrderProducts).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith([]);
  });

  test("putProductsStatus 메소드 성공", async () => {
    const req = mockRequest({
      params: {
        productId: "1",
      },
      body: {
        status: 1,
      },
    });
    const res = mockResponse();
    await adminController.putProductsStatus(req, res);

    expect(adminService.putProductsStatus).toHaveBeenCalledWith(
      +req.params.productId,
      req.body.status
    );
    expect(adminService.putProductsStatus).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({
      message: "상품 상태를 변경하였습니다.",
    });
  });

  test("putUserGrade 메소드 성공", async () => {
    const req = mockRequest({
      params: {
        userId: "1",
      },
      body: {
        grade: 1,
      },
    });
    const res = mockResponse();
    await adminController.putUserGrade(req, res);

    expect(adminService.putUserGrade).toHaveBeenCalledWith(
      +req.params.userId,
      req.body.grade
    );
    expect(adminService.putUserGrade).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({
      message: "등급이 변경되었습니다.",
    });
  });
});
