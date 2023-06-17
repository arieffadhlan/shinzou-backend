const express = require("express");
const controllers =  require("../app/controllers/index");

const router = express.Router();

// Auth
router.post("/register", controllers.authController.register);
router.post("/login", controllers.authController.login);
router.post("/verify/:token", controllers.authController.verifyOTP);
router.post("/forgot-password", controllers.authController.forgotPassword);
router.post("/reset-password/:token", controllers.authController.resetPassword);

module.exports = router;