"use strict";
// @ts-check

const supertest = require("supertest");
const app = require("../../src/app");

const userSeed = require("../../sequelize/seeders/20230203014824-user");
const productSeed = require("../../sequelize/seeders/20230203024610-product");
const orderSeed = require("../../sequelize/seeders/20230203043628-order");
const orderProductSeed = require("../../sequelize/seeders/20230203043637-order_product");
const cartSeed = require("../../sequelize/seeders/20230203043656-cart");

const db = require("../../sequelize/models/index.js");
/** @type {import('sequelize').Sequelize} */
const sequelize = db.sequelize;

beforeAll(async () => {
  if (process.env.NODE_ENV === "test") {
    await sequelize.sync();
  } else {
    throw new Error("NODE_ENV가 test 환경으로 설정되어 있지 않습니다.");
  }
});

beforeEach(async () => {
  const queryInterface = sequelize.getQueryInterface();
    await userSeed.up(queryInterface)
    await productSeed.up(queryInterface)
    await orderSeed.up(queryInterface)
    await orderProductSeed.up(queryInterface)
    await cartSeed.up(queryInterface)
});

describe("Admin Domain Integration Test", () => {
  test("GET api/admin/products (GetProducts)", async () => {
    const response = await supertest(app)
      .get("/api/admin/products")
      .query({})
      .send({});

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({ data: [] });
  });
});


afterEach(async () => {
  const queryInterface = sequelize.getQueryInterface();
    await userSeed.down(queryInterface)
    await productSeed.down(queryInterface)
    await orderSeed.down(queryInterface)
    await orderProductSeed.down(queryInterface)
    await cartSeed.down(queryInterface)
});

afterAll(async () => {
  // 통합 테스트가 완료되었을 경우 sequelize의 연결된 테이블들의 정보를 초기화합니다.
  if (process.env.NODE_ENV === "test") {
    await sequelize.sync({ force: true });
  } else {
    throw new Error("NODE_ENV가 test 환경으로 설정되어 있지 않습니다.");
  }
});
