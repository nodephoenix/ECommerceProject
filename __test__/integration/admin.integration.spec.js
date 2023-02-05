"use strict";
// @ts-check

// require('dotenv').config('../../.env')
const jwt = require("jsonwebtoken");
const supertest = require("supertest");
const app = require("../../src/app");

const db = require("../../sequelize/models/index.js");
const seederHelper = require("../helper/seeder.helper");
/** @type {import('sequelize').Sequelize} */
const sequelize = db.sequelize;

let token;
beforeAll(async () => {
  if (process.env.NODE_ENV === "test") {
    await sequelize.sync({ force: true });
  } else {
    throw new Error("NODE_ENV가 test 환경으로 설정되어 있지 않습니다.");
  }
});

beforeEach(async () => {
  const queryInterface = sequelize.getQueryInterface();
  await seederHelper.up(queryInterface);
  // 어드민 유저로 로그인
  token = jwt.sign({ id: 1 }, process.env.JWT_SECRET_KEY, {
    algorithm: "HS256", // 해싱 알고리즘
    expiresIn: process.env.JWT_EXPIRES_IN, // 토큰 유효 기간
    issuer: "issuer", // 발행자
  });
});

describe("Admin Domain Integration Test", () => {
  test("POST api/admin/products (RegisterProducts)", async () => {
    const response = await supertest(app)
    .post("/api/admin/products")
    .set("Cookie", `x_auth=${token}`)
    .send({})

    expect(response.status).toEqual(201);
  });

  test("PUT api/admin/products/:productId (editProducts)", async () => {
    const response = await supertest(app)
    .put("/api/admin/products/1")
    .set("Cookie", `x_auth=${token}`)
    .send({})

    expect(response.status).toEqual(201);
  });

  test("DELETE api/admin/products/:productId (deleteProducts)", async () => {
    const response = await supertest(app)
    .put("/api/admin/products/1")
    .set("Cookie", `x_auth=${token}`)
    .send({})

    expect(response.status).toEqual(201);
  });


  test("GET api/admin/products (GetProducts)", async () => {
    const response = await supertest(app)
      .get("/api/admin/products")
      .set("Cookie", `x_auth=${token}`)
      .send({});

    expect(response.status).toEqual(200);
  });

  
  test("PUT api/admin/products/:productId/status (putProductsStatus)", async () => {
    const response = await supertest(app)
    .put("/api/admin/products/1/status")
    .set("Cookie", `x_auth=${token}`)
    .send({
      status: 1
    })

    expect(response.status).toEqual(201);
  });
  
  test("PUT api/admin/user/:userId/grade (putProductsStatus)", async () => {
    const response = await supertest(app)
    .put("/api/admin/user/2/grade")
    .set("Cookie", `x_auth=${token}`)
    .send({
      grade: 1
    })

    expect(response.status).toEqual(201);
  });
});

afterEach(async () => {
  const queryInterface = sequelize.getQueryInterface();
  await seederHelper.down(queryInterface);
});

afterAll(async () => {
  // 통합 테스트가 완료되었을 경우 sequelize의 연결된 테이블들의 정보를 초기화합니다.
  if (process.env.NODE_ENV === "test") {
    await sequelize.sync({ force: true });
  } else {
    throw new Error("NODE_ENV가 test 환경으로 설정되어 있지 않습니다.");
  }
});
