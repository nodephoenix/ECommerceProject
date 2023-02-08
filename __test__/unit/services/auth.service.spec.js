"use strict";
// @ts-check
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

/** @typedef {import('../../../src/repository/auth.repository')} AuthRepositoryType */
// AuthController 내부에서 생성되어 들어가는 서비스 클래스
// 서비스 클래스를 모킹화하여 실제 서비스가 안 들어가도록 한다.
/** @type {jest.MockInstance<AuthRepositoryType>} */
const AuthRepository = require("../../../src/repository/auth.repository");
const AuthService = require("../../../src/services/auth.service");
jest.mock("../../../src/repository/auth.repository");

/** @type {AuthService} */
let authService;
/** @type {jest.Mocked<AuthRepositoryType>} */
let authRepository;
beforeEach(() => {
  AuthRepository.mockClear();
  authService = new AuthService();
  authRepository = authService.authRepository;
  authRepository.findUser = jest.fn();
  authRepository.userRegister = jest.fn();
});

describe("AuthService", () => {
  test("create Instance of AuthService", () => {
    expect(authService).toBeTruthy();
  });
});

describe("AuthService.userRegister", () => {
  test("method exist", () => {
    expect(authService.userRegister).toBeTruthy();
  });

  test("method success", () => {
    const userName = "testuser",
      email = "testuser@gmail.com",
      password = "test1234yo!",
      phone = "010-1234-5678",
      address = "디스이즈 스파르타군";
    const userData = {
      id: 6,
      userName,
      email,
      password: "hashpassword",
      salt: "salt",
      phone,
      address,
    };
    authRepository.userRegister.mockResolvedValue(userData);
    expect(
      authService.userRegister(userName, email, password, phone, address)
    ).resolves.toStrictEqual({
      id: userData.id,
      userName: userData.userName,
      email: userData.email,
      password: userData.hashPassword,
      salt: userData.salt,
      phone: userData.phone,
    });
  });
});

describe("AuthService.userLogin", () => {
  const hashPassword = (password, salt) =>
    crypto
      .createHash("sha512")
      .update(password + salt)
      .digest("hex");

  test("method exist", () => {
    expect(authService.userLogin).toBeTruthy();
  });

  test("method success", () => {
    const email = "testuser@gmail.com",
      password = "test1234yo!";
    const user = {
      id: 2,
      password: hashPassword(password, "salt"),
      salt: "salt",
    };
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
      algorithm: "HS256", // 해싱 알고리즘
      expiresIn: process.env.JWT_EXPIRES_IN, // 토큰 유효 기간
      issuer: "issuer", // 발행자
    });
    authRepository.findUser.mockResolvedValue(user);

    expect(authService.userLogin(email, password)).resolves.toBe(token);
  });

  test("not found user", () => {
    const email = "testuser@gmail.com",
      password = "test1234yo!";
    authRepository.findUser.mockResolvedValue(null);

    expect(authService.userLogin(email, password)).rejects.toThrow(
      new Error("이메일 또는 패스워드를 확인해주세요")
    );
  });

  test("not correct password", () => {
    const email = "testuser@gmail.com",
      password = "test1234ye!",
      correctpassword = "test1234yo!";
    const user = {
      id: 2,
      password: hashPassword(correctpassword, "salt"),
      salt: "salt",
    };
    authRepository.findUser.mockResolvedValue(user);

    expect(authService.userLogin(email, password))
      .rejects.toThrow(new Error("이메일 또는 비밀번호 확인해주세요"))
  });
});
