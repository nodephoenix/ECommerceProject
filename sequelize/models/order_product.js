"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order_product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  Order_product.init(
    {
      count: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order_product",
      timestamps: true,
      paranoid: false,
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
  return Order_product;
};
