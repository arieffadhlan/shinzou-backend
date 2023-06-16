const ApplicationError = require("../errors/ApplicationError");
const authService = require("../services/authService");

const register = async (req, res) => {
  try {
    const user = await authService.register(req);

    res.status(201).json({
      status: "Success",
      message: "Tautan verifikasi telah dikirim!",
      data: user
    });
  } catch (error) {
    res.status(error.statusCode).json({
      status: "Error",
      message: error.message
    });
  }
}

const login = async (req, res) => {
  try {
    const user = await authService.login(req);

    res.status(201).json({
      status: "Success",
      message: "Login telah berhasil!",
      token: user.token
    });
  } catch (error) {
    res.status(error.statusCode).json({
      status: "Error",
      message: error.message
    });
  }
}

module.exports = {
  register,
  login
}