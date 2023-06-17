'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Airport extends Model {
    static associate(models) {
      this.hasMany(models.Flight, {
        foreignKey: "origin_airport_id",
        as: "originAirports"
      });
      this.hasMany(models.Flight, {
        foreignKey: "destination_airport_id",
        as: "destinationAirports"
      });
    }
  }
  Airport.init({
    id: DataTypes.INTEGER,
    airport_code: DataTypes.CHAR(3),
    airport_name: DataTypes.STRING,
    airport_location: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Airport',
  });
  return Airport;
};