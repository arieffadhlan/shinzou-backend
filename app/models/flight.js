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
      this.belongsTo(models.Class, {
        foreignKey: "class_id",
        as: "class"
      });
      this.belongsTo(models.Transaction, { as: "transaction" });
      this.belongsTo(models.Seat, { as: "seat" });
    }
  }
  Flight.init({
    id: DataTypes.UUID,
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
    class_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Class",
        key: "id"
      }
    },
    departure_datetime: DataTypes.DATE,
    arrival_datetime: DataTypes.DATE,
    capacity: DataTypes.INTEGER,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: "Flight",
  });
  Flight.beforeCreate((flight) => flight.id = uuidv4());
  return Flight;
};