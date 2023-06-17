"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Airline extends Model {
    static associate(models) {
      this.hasMany(models.Flight, { as: "flights" });
    }
  }
  Airline.init({
    id: DataTypes.INTEGER,
    airline_code: DataTypes.CHAR(3),
    airline_name: DataTypes.STRING,
    airline_image: DataTypes.STRING
  }, {
    sequelize,
    modelName: "Airline",
  });
  return Airline;
};