const express = require("express");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../docs/openapi.json');
const controllers =  require("../app/controllers");
const middlewares = require("../app/middlewares");

const router = express.Router();

// Swagger UI Documentation
router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(swaggerDocument));

// Auth
router.post("/api/v1/register", controllers.authController.register);
router.post("/api/v1/login", controllers.authController.login);
router.post("/api/v1/verify", controllers.authController.verifyOTP);
router.post("/api/v1/forgot-password", controllers.authController.forgotPassword);
router.post("/api/v1/reset-password/:token", controllers.authController.resetPassword);

// Airport
router.get("/api/v1/airport", middlewares.authorize, controllers.airportController.getAirports);
router.get("/api/v1/airport/:id", middlewares.authorize, controllers.airportController.getAirport);
router.post("/api/v1/airport", middlewares.authorize, controllers.airportController.addAirport);
router.put("/api/v1/airport/:id", middlewares.authorize, controllers.airportController.updateAirport);
router.delete("/api/v1/airport/:id", middlewares.authorize, controllers.airportController.deleteAirport);

// Airline
router.get("/api/v1/airline", middlewares.authorize, controllers.airlineController.getAirlines);
router.get("/api/v1/airline/:id", middlewares.authorize, controllers.airlineController.getAirline);
router.post("/api/v1/airline", middlewares.authorize, controllers.airlineController.addAirline);
router.put("/api/v1/airline/:id", middlewares.authorize, controllers.airlineController.updateAirline);
router.delete("/api/v1/airline/:id", middlewares.authorize, controllers.airlineController.deleteAirline);

// Flight
router.get("/api/v1/search-flight", middlewares.authorize, controllers.flightController.searchFlight);
router.get("/api/v1/flight", middlewares.authorize, controllers.flightController.getFlights);
router.get("/api/v1/flight/:id", middlewares.authorize, controllers.flightController.getFlight);
router.post("/api/v1/flight", middlewares.authorize, controllers.flightController.addFlight);
router.put("/api/v1/flight/:id", middlewares.authorize, controllers.flightController.updateFlight);
router.delete("/api/v1/flight/:id", middlewares.authorize, controllers.flightController.deleteFlight);

// Transaction
router.post("/api/v1/checkout", middlewares.authorize, controllers.transactionController.addTransaction);
router.put("/api/v1/payment/:booking_code", middlewares.authorize, controllers.transactionController.addPayment);

module.exports = router;