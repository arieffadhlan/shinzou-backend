"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Transaction, { as: "transactions" });
      this.hasMany(models.Notification, { as: "notifications" });
    }
  }
  User.init({
    id: DataTypes.UUID,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    password: DataTypes.STRING,
    is_verified: DataTypes.BOOLEAN,
    role: DataTypes.STRING,
    otp: DataTypes.CHAR(6),
    password_reset_token: DataTypes.UUID
  }, {
    sequelize,
    modelName: "User",
  });
  User.beforeCreate((user) => {
    user.id = uuidv4();
    user.password_reset_token = uuidv4();
  });
  return User;
};