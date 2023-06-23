require("dotenv").config();

module.exports = {
  JWT_SIGNATURE_KEY: process.env.JWT_SIGNATURE_KEY || "Secret",
}