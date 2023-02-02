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
      image: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
      likes: DataTypes.INTEGER,
      views: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
