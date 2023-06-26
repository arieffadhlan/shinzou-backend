"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      this.belongsTo(models.Flight, {
        foreignKey: "flight_id",
        as: "flight"
      });
      this.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user"
      });
      this.hasMany(models.Ticket, {
        foreignKey: "transaction_id",
        as: "tickets"
      });
    }
  }
  Transaction.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    flight_id: {
      type: DataTypes.UUID,
      references: {
        model: "Flight",
        key: "id"
      }
    },
    user_id: {
      type: DataTypes.UUID,
      references: {
        model: "User",
        key: "id"
      }
    },
    booking_code: DataTypes.CHAR(9),
    ammount: DataTypes.INTEGER,
    payment_method: DataTypes.STRING
  }, {
    sequelize,
    modelName: "Transaction",
  });
  Transaction.beforeCreate((transaction) => transaction.id = uuidv4());
  return Transaction;
};