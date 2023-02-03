const jwt = require("jsonwebtoken");
const { secretKey } = require("../../sequelize/config/secretKey");

const { User } = require("../../sequelize/models");

module.exports = (req, res, next) => {
  const cookie = req.cookies["x_auth"];

  if (!cookie) {
    return res.status(401).json({ errorMessage: "로그인 후 이용 가능합니다." });
  }
  try {
    const { id } = jwt.verify(cookie, secretKey);
    User.findByPk(id).then((user) => {
      res.locals.user = user;
      next();
    });
  } catch (error) {
    res.status(401).json({ errorMessage: error.message });
  }
};
