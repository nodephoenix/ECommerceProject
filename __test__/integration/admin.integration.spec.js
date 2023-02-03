"use strict";
// @ts-check

const supertest = require("supertest");
const app = require("../../src/app");
const { sequelize } = require("../../sequelize/models/index.js");

beforeAll(async () => {
  if (process.env.NODE_ENV === "test") await sequelize.sync();
  else throw new Error("NODE_ENV가 test 환경으로 설정되어 있지 않습니다.");
});

describe("Admin Domain Integration Test", () => {
  test("GET api/admin/products (GetProducts)", async () => {
    const response = await supertest(app)
      .get("/api/admin/products")
      .query({})
      .send({});

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({ data: []})
  });
});

afterAll(async () => {
  // 통합 테스트가 완료되었을 경우 sequelize의 연결된 테이블들의 정보를 초기화합니다.
  if (process.env.NODE_ENV === 'test') await sequelize.sync({ force: true });
  else throw new Error('NODE_ENV가 test 환경으로 설정되어 있지 않습니다.');
});
