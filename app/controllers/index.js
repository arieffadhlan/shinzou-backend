const authController = require("./auth-controller");
const airlineController = require("./airline-controller");
const airportController = require("./airport-controller");
const flightController = require("./flight-controller");
const notificationController = require("./notification-controller");
const transactionController = require("./transaction-controller");
const userController = require("./user-controller");

module.exports = {
  authController,
  airlineController,
  airportController,
  flightController,
  notificationController,
  transactionController,
  userController
}