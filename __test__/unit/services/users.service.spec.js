"use strict";
// @ts-check

/** @typedef {import('../../../src/repository/users.repository')} UsersRepositoryType */
// UsersController 내부에서 생성되어 들어가는 서비스 클래스
// 서비스 클래스를 모킹화하여 실제 서비스가 안 들어가도록 한다.
/** @type {jest.MockInstance<UsersRepositoryType>} */
const UsersRepository = require("../../../src/repository/users.repository");
const UsersService = require("../../../src/services/users.service");
jest.mock("../../../src/repository/users.repository");

/** @type {UsersService} */
let usersService;
/** @type {jest.Mocked<UsersRepositoryType>} */
let usersRepository;
beforeEach(() => {
  UsersRepository.mockClear();
  usersService = new UsersService();
  usersRepository = usersService.usersRepository;
  usersRepository.findUserInfo = jest.fn();
  usersRepository.updateUserInfo = jest.fn();
});

describe("UsersService", () => {
  test("create Instance of UsersService", () => {
    expect(usersService).toBeTruthy();
  });
});

describe("UsersService.userInfo", () => {
  test("method exist", () => {
    expect(usersService.userInfo).toBeTruthy();
  });

  test("method success", () => {
    const userId = 3;
    const userInfo = {};
    usersRepository.findUserInfo.mockResolvedValue(userInfo);
    expect(usersService.userInfo(userId)).resolves.toStrictEqual(userInfo);
  });
});

describe("UsersService.updateUserInfo", () => {
  test("method exist", () => {
    expect(usersService.updateUserInfo).toBeTruthy();
  });

  test("method success", () => {
    const userId = 3;
    const userName = "testman";
    const email = "test@gmail.com";
    const phone = "010-1234-5678";
    const updateUserInfo = {};
    usersRepository.updateUserInfo.mockResolvedValue(updateUserInfo);
    expect(
      usersService.updateUserInfo(userId, userName, email, phone)
    ).resolves.toStrictEqual(updateUserInfo);
  });
});
