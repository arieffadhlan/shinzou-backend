"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    static associate(models) {
      this.belongsTo(models.Transaction, {
        foreignKey: "transaction_id",
        as: "transaction"
      });
      this.belongsTo(models.Passenger, {
        foreignKey: "passenger_id",
        as: "passenger"
      });
      this.belongsTo(models.Seat, {
        foreignKey: "seat_id",
        as: "seat"
      });
    }
  }
  Ticket.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    transaction_id: {
      type: DataTypes.UUID,
      references: {
        model: "Transaction",
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
    seat_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Seat",
        key: "id"
      }
    },
  }, {
    sequelize,
    modelName: "Ticket",
  });
  Ticket.beforeCreate((Ticket) => Ticket.id = uuidv4());
  return Ticket;
};