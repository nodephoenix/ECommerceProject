"use strict";

const AuthService = require("../services/auth.service.js");
const Status = require("../middleware/status.code.js");

class AuthController {
  authService = new AuthService();
  code = new Status();

  // 회원가입 API
  userRegister = async (req, res, next) => {
    try {
      const { userName, email, password, confirmPassword, phone } = req.body;
      // 비밀번호 일치 여부
      if (password !== confirmPassword) {
        return res.status(404).send("비밀번호가 일치하지 않습니다.");
      }

      // 비밀번호 특수문자, 영문, 숫자를 모두 사용, 8~15자리
      const passwordCheck =
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/;
      if (!passwordCheck.test(password)) {
        return res
          .status(400)
          .send(
            "비밀번호는 8~15 자리, 특수문자, 영문, 숫자 모두 포함해야 합니다."
          );
      }

      await this.authService.userRegister(userName, email, password, phone);
      return res.status(200).json({ message: "회원가입이 완료되었습니다." });
    } catch (error) {
      return res
        .status(this.code.badRequest.status)
        .json(this.code.badRequest.status);
    }
  };
  // 로그인 API
  userLogin = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const token = await this.authService.userLogin(email, password);

      if (token) {
        res.cookie("x_auth", token, {
          httpOnly: true,
          maxAge: 0.5 * 60 * 60 * 1000, // 쿠키 만료 시간 30분
        });
        res.status(200).send("로그인되었습니다.");
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
}
module.exports = AuthController;
