"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Order.belongsTo(models.User, {
        foreignKey: "user_id",
        targetKey: "id",
      });
      models.Order.hasMany(models.Order_product, {
        foreignKey: "orders_id",
        sourceKey: "id",
      });
    }
  }
  Order.init(
    {
      status: DataTypes.INTEGER,
      defaultValue: 0,
    },
    {
      sequelize,
      modelName: "Order",
      timestamps: true,
      paranoid: false,
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
  return Order;
};
