const authService = require("../services/auth-service");

const register = async (req, res) => {
  try {
    const user = await authService.register(req);

    res.status(201).json({
      status: "Success",
      message: "Tautan verifikasi telah dikirim.",
      data: user
    });
  } catch (error) {
    res.status(error.statusCode || 400).json({
      status: "Error",
      message: error.message
    });
  }
}

const verifyOTP = async (req, res) => {
  try {
    await authService.verifyOTP(req);
    
    res.status(200).json({
      status: "Success",
      message: "Registrasi telah berhasil."
    });
  } catch (error) {
    res.status(error.statusCode || 400).json({
      status: "Error",
      message: error.message
    });
  }
}

const login = async (req, res) => {
  try {
    const user = await authService.login(req);
    
    res.cookie("token", user.token, { 
        httpOnly: true, 
        expires: new Date(Date.now() + 60000),
      })
      .status(201)
      .json({
        status: "Success",
        message: "Login telah berhasil.",
        token: user.token
      });
  } catch (error) {
    res.status(error.statusCode || 400).json({
      status: "Error",
      message: error.message
    });
  }
}

const forgotPassword = async (req, res) => {
  try {
    await authService.forgotPassword(req);
    
    res.status(200).json({
      status: "Success",
      message: "Tautan reset password berhasil terkirim."
    });
  } catch (error) {
    res.status(error.statusCode || 400).json({
      status: "Error",
      message: error.message
    });
  }
}

const resetPassword = async (req, res) => {
  try {
    await authService.resetPassword(req);
    
    res.status(200).json({
      status: "Success",
      message: "Reset password berhasil."
    });
  } catch (error) {
    res.status(error.statusCode || 400).json({
      status: "Error",
      message: error.message
    });
  }
}

const logout = (req, res) => {
  return res.clearCookie("token")
    .status(200)
    .json({
      status: "Success",
      message: "Logout telah berhasil"
    });
}

module.exports = {
  register,
  verifyOTP,
  login,
  forgotPassword,
  resetPassword,
  logout
}