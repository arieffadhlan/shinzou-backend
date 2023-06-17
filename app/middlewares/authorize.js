const jwt = require("jsonwebtoken");
const { JWT_SIGNATURE_KEY } = require("../../config/application");

const authorize = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const payload = jwt.verify(token, JWT_SIGNATURE_KEY);
    
    req.user = payload;
    console.log(payload);
    next();
  } catch (error) {
    res.status(401).json({
      status: "Error",
      message: "Required authorization."
    });
  }
}

module.exports = authorize;