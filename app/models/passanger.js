"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, DataTypes) => {
  class Passanger extends Model {
    static associate(models) {
      this.hasMany(models.Transaction, { 
        foreignKey: "transaction_id",
        as: "transactions"
      });
      this.hasOne(models.Seat, { 
        foreignKey: "seat_id",
        as: "seat"
      });
    }
  }
  Passanger.init({
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
    seat_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Seat",
        key: "id"
      }
    },
    title: DataTypes.STRING,
    name: DataTypes.STRING,
    family_name: DataTypes.STRING,
    phone_number: DataTypes.STRING
  }, {
    sequelize,
    modelName: "Passanger",
  });
  Passanger.beforeCreate((passanger) => passanger.id = uuidv4());
  return Passanger;
};