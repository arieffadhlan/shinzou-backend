"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, DataTypes) => {
  class Flight extends Model {
    static associate(models) {
      this.belongsTo(models.Airport, {
        foreignKey: "origin_airport_id",
        as: "originAirport"
      });
      this.belongsTo(models.Airport, {
        foreignKey: "destination_airport_id",
        as: "destinationAirport"
      });
      this.belongsTo(models.Airline, {
        foreignKey: "airline_id",
        as: "airline"
      });
      this.hasMany(models.Transaction, { 
        foreignKey: "flight_id",
      });
      this.hasMany(models.Seat, { 
        foreignKey: "flight_id",
      });
    }
  }
  Flight.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    origin_airport_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Airport",
        key: "id"
      }
    },
    destination_airport_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Airport",
        key: "id"
      }
    },
    airline_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Airline",
        key: "id"
      }
    },
    departure_date: DataTypes.DATEONLY,
    departure_datetime: DataTypes.DATE,
    arrival_date: DataTypes.DATEONLY,
    arrival_datetime: DataTypes.DATE,
    capacity: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    class: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: "Flight",
  });
  Flight.beforeCreate((flight) => flight.id = uuidv4());
  return Flight;
};