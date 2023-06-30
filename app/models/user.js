"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Notification, { 
        foreignKey: "user_id",
        as: "notifications"
      });
      this.hasMany(models.Transaction, { 
        foreignKey: "user_id",
        as: "transactions"
      });
    }
  }
  User.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    password: DataTypes.STRING,
    is_verified: DataTypes.BOOLEAN,
    role: DataTypes.STRING,
    otp: DataTypes.CHAR(6),
    token: DataTypes.UUID
  }, {
    sequelize,
    modelName: "User",
  });
  User.beforeCreate((user) => {
    user.id = uuidv4();
    user.token = uuidv4();
  });
  return User;
};