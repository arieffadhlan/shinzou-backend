const express = require("express");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../docs/openapi.json');
const controllers =  require("../app/controllers");
const middlewares = require("../app/middlewares");

const router = express.Router();

// Swagger UI Documentation
router.use("/", swaggerUi.serve);
router.get("/", swaggerUi.setup(swaggerDocument));

// Auth
router.post("/api/v1/register", controllers.authController.register);
router.post("/api/v1/verify", controllers.authController.verifyOTP);
router.post("/api/v1/resend-otp/:id", controllers.authController.resendOTP);
router.post("/api/v1/login", controllers.authController.login);
router.post("/api/v1/forgot-password", controllers.authController.forgotPassword);
router.post("/api/v1/reset-password/:token", controllers.authController.resetPassword);

// User
router.get("/api/v1/user", middlewares.authorize, controllers.userController.getUsers);
router.get("/api/v1/user/:id", middlewares.authorize, controllers.userController.getUser);
router.put("/api/v1/user/:id", middlewares.authorize, controllers.userController.updateUser);

// Airport
router.get("/api/v1/airport", controllers.airportController.getAirports);
router.get("/api/v1/airport/:id", controllers.airportController.getAirport);
router.post("/api/v1/airport", middlewares.authorize, controllers.airportController.addAirport);
router.put("/api/v1/airport/:id", middlewares.authorize, controllers.airportController.updateAirport);
router.delete("/api/v1/airport/:id", middlewares.authorize, controllers.airportController.deleteAirport);

// Airline
router.get("/api/v1/airline", controllers.airlineController.getAirlines);
router.get("/api/v1/airline/:id", controllers.airlineController.getAirline);
router.post("/api/v1/airline", middlewares.authorize, controllers.airlineController.addAirline);
router.put("/api/v1/airline/:id", middlewares.authorize, controllers.airlineController.updateAirline);
router.delete("/api/v1/airline/:id", middlewares.authorize, controllers.airlineController.deleteAirline);

// Flight
router.get("/api/v1/search-flight", controllers.flightController.searchFlight);
router.get("/api/v1/flight", controllers.flightController.getFlights);
router.get("/api/v1/flight/:id", controllers.flightController.getFlight);
router.post("/api/v1/flight", middlewares.authorize, controllers.flightController.addFlight);
router.put("/api/v1/flight/:id", middlewares.authorize, controllers.flightController.updateFlight);
router.delete("/api/v1/flight/:id", middlewares.authorize, controllers.flightController.deleteFlight);

// Transaction
// Order History
router.get("/api/v1/transaction", middlewares.authorize, controllers.transactionController.getTransactions);
router.get("/api/v1/transaction/:id", middlewares.authorize, controllers.transactionController.getTransaction);
// Checkout
router.post("/api/v1/transaction", middlewares.authorize, controllers.transactionController.addTransaction);
router.post("/api/v1/print-ticket", middlewares.authorize, controllers.transactionController.printTicket);
// Payment

router.put("/api/v1/transaction/:booking_code", middlewares.authorize, controllers.transactionController.addPayment);

// Notification
router.get("/api/v1/notification", middlewares.authorize, controllers.notificationController.getNotifications);
router.get("/api/v1/notification/mark-as-read", middlewares.authorize, controllers.notificationController.markAsRead);


module.exports = router;