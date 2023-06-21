const express = require("express");
const controllers =  require("../app/controllers");
const middlewares = require("../app/middlewares");

const router = express.Router();

// Auth
router.post("/register", controllers.authController.register);
router.post("/login", controllers.authController.login);
router.post("/verify", controllers.authController.verifyOTP);
router.post("/forgot-password", controllers.authController.forgotPassword);
router.post("/reset-password/:token", controllers.authController.resetPassword);

// Airport
router.get("/airport", middlewares.authorize, controllers.airportController.getAirports);
router.get("/airport/:id", middlewares.authorize, controllers.airportController.getAirport);
router.post("/airport", middlewares.authorize, controllers.airportController.addAirport);
router.put("/airport/:id", middlewares.authorize, controllers.airportController.updateAirport);
router.delete("/airport/:id", middlewares.authorize, controllers.airportController.deleteAirport);

// Airline
router.get("/airline", middlewares.authorize, controllers.airlineController.getAirlines);
router.get("/airline/:id", middlewares.authorize, controllers.airlineController.getAirline);
router.post("/airline", middlewares.authorize, controllers.airlineController.addAirline);
router.put("/airline/:id", middlewares.authorize, controllers.airlineController.updateAirline);
router.delete("/airline/:id", middlewares.authorize, controllers.airlineController.deleteAirline);

// Flight
// router.get("/flight", middlewares.authorize, controllers.flightController.getFlights);
// router.get("/flight/:id", middlewares.authorize, controllers.flightController.getFlight);
// router.post("/flight", middlewares.authorize, controllers.flightController.addFlight);
// router.put("/flight/:id", middlewares.authorize, controllers.flightController.updateFlight);
// router.delete("/flight/:id", middlewares.authorize, controllers.flightController.deleteFlight);

module.exports = router;