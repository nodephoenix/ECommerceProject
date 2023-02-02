"use strict";
const { Model } = require("sequelize");
const orderProduct = require("./order_product");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Product.hasMany(models.Order_product, {
        foreignKey: "user_id",
        sourceKey: "id",
      });
      models.Product.hasMany(models.Cart, {
        foreignKey: "product_id",
        sourceKey: "id",
      });
    }
  }
  Product.init(
    {
      productName: DataTypes.STRING,
      category: DataTypes.INTEGER,
      desc: DataTypes.STRING,
      price: DataTypes.INTEGER,
      image: DataTypes.STRING,
      status: DataTypes.INTEGER,
      defaultValue: 0,
      likes: DataTypes.INTEGER,
      views: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
      timestamps: true,
      paranoid: false,
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
  return Product;
};
