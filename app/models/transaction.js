"use strict";
const { Model } = require("sequelize");
User.beforeCreate((user) => user.id = uuidv4());
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      this.hasMany(models.Flight, {
        foreignKey: "flight_id",
        as: "flights"
      });
      this.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user"
      });
      this.belongsTo(models.Passanger, { as: "passanger" });
    }
  }
  Transaction.init({
    id: DataTypes.UUID,
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
    ammount: DataTypes.STRING,
    payment_method: DataTypes.STRING
  }, {
    sequelize,
    modelName: "Transaction",
  });
  Transaction.beforeCreate((transaction) => transaction.id = uuidv4());
  return Transaction;
};