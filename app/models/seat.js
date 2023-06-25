"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Seat extends Model {
    static associate(models) {
      this.belongsTo(models.Flight, {
        foreignKey: "flight_id",
        as: "flight"
      });
      this.belongsTo(models.Passenger, { 
        foreignKey: "passenger_id",
        as: "passenger"
      });
    }
  }
  Seat.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    flight_id: {
      type: DataTypes.UUID,
      references: {
        model: "Flight",
        key: "id"
      }
    },
    passenger_id: {
      type: DataTypes.UUID,
      references: {
        model: "Passenger",
        key: "id"
      }
    },
    seat_number: DataTypes.STRING
  }, {
    sequelize,
    modelName: "Seat",
  });
  return Seat;
};