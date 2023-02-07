require("dotenv").config('../../.env');

const development = {
  username: process.env.SEQUELIZE_DEVELOPMENT_USERNAME || "root",
  password: process.env.SEQUELIZE_DEVELOPMENT_PASSWORD || null,
  database: process.env.SEQUELIZE_DEVELOPMENT_DATABASE || "nodephoenix",
  host: process.env.SEQUELIZE_DEVELOPMENT_HOST || "127.0.0.1",
  dialect: "mysql",
};

const test = {
  username: process.env.SEQUELIZE_TEST_USERNAME || "root",
  password: process.env.SEQUELIZE_TEST_PASSWORD || null,
  database: process.env.SEQUELIZE_TEST_DATABASE || "nodephoenix_test",
  host: process.env.SEQUELIZE_TEST_HOST || "127.0.0.1",
  dialect: "mysql",
};

const production = {
  username: process.env.SEQUELIZE_PRODUCTION_USERNAME || "root",
  password: process.env.SEQUELIZE_PRODUCTION_PASSWORD || null,
  database: process.env.SEQUELIZE_PRODUCTION_DATABASE || "nodephoenix_prod",
  host: process.env.SEQUELIZE_PRODUCTION_HOST || "127.0.0.1",
  dialect: "mysql",
};

module.exports = {
  development,
  test,
  production,
};
