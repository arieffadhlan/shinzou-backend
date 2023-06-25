"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, DataTypes) => {
  class Passenger extends Model {
    static associate(models) {
      this.hasMany(models.Transaction, { 
        foreignKey: "passenger_id",
      });
      this.hasOne(models.Seat, { 
        foreignKey: "passenger_id",
      });
    }
  }
  Passenger.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    title: DataTypes.STRING,
    name: DataTypes.STRING,
    family_name: DataTypes.STRING,
    phone_number: DataTypes.STRING
  }, {
    sequelize,
    modelName: "Passenger",
  });
  Passenger.beforeCreate((passenger) => passenger.id = uuidv4());
  return Passenger;
};