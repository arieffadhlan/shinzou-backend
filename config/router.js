const express = require("express");
const controllers =  require("../app/controllers/index");

const router = express.Router();

// Auth
router.post("/auth/register", controllers.authController.register);
router.post("/auth/login", controllers.authController.login);

module.exports = router;