const express = require("express");
const controllers =  require("../app/controllers");
const middlewares = require("../app/middlewares");

const router = express.Router();

// Auth
router.post("/register", controllers.authController.register);
router.post("/login", controllers.authController.login);
router.post("/verify/:token", controllers.authController.verifyOTP);
router.post("/forgot-password", controllers.authController.forgotPassword);
router.post("/reset-password/:token", controllers.authController.resetPassword);
router.post("/logout", middlewares.authorize, controllers.authController.logout);

module.exports = router;