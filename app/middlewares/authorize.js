const jwt = require("jsonwebtoken");
const { JWT_SIGNATURE_KEY } = require("../../config/application");
const ApplicationError = require("../errors/ApplicationError");

const authorize = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      throw new ApplicationError(422, "Maaf sesi Anda telah habis, silakan login kembali.");
    }
    
    const payload = jwt.verify(token, JWT_SIGNATURE_KEY);
    req.user = payload;

    next();
  } catch (error) {
    if (error instanceof ApplicationError) {
      res.status(error.statusCode).json({
        status: "Error",
        message: error.message
      });
    } else {
      res.status(401).json({
        status: "Error",
        message: "Required authorization."
      });
    }
  }
}

module.exports = authorize;