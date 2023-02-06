const jwt = require("jsonwebtoken");
require("dotenv").config("../../.env");

const { User } = require("../../sequelize/models");

module.exports = (req, res, next) => {
  const cookie = req.cookies["x_auth"];

  if (!cookie) {
    res.locals.user = 3;
    next();
  }
  try {
    const { id } = jwt.verify(cookie, process.env.JWT_SECRET_KEY);
    User.findByPk(id).then((user) => {
      res.locals.user = user.role
      next();
    });
  } catch (error) {
    res.locals.user = 3;
    next();
  }
};
