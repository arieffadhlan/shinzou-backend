'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Airport extends Model {
    static associate(models) {
      this.hasMany(models.Flight, {
        foreignKey: "origin_airport_id",
      });
      this.hasMany(models.Flight, {
        foreignKey: "destination_airport_id",
      });
    }
  }
  Airport.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    airport_code: DataTypes.CHAR(3),
    airport_name: DataTypes.STRING,
    location: DataTypes.STRING,
    location_acronym: DataTypes.CHAR(3)
  }, {
    sequelize,
    modelName: 'Airport',
  });
  return Airport;
};