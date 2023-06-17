"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    static associate(models) {
      this.hasMany(models.Flight, { as: "flights" });
    }
  }
  Class.init({
    id: DataTypes.INTEGER,
    class_name: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: "Class",
  });
  return Class;
};