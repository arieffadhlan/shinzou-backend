"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Airline extends Model {
    static associate(models) {
      this.hasMany(models.Flight, { 
        foreignKey: "airline_id",
      });
    }
  }
  Airline.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    airline_code: DataTypes.CHAR(2),
    airline_name: DataTypes.STRING,
    airline_image: DataTypes.STRING
  }, {
    sequelize,
    modelName: "Airline",
  });
  return Airline;
};