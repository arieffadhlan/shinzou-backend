const userService = require("../services/user-service");

const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();

    res.status(200).json({
      status: "Success",
      data: users
    });
  } catch (error) {
    res.status(error.statusCode || 400).json({
      status: "Error",
      message: error.message
    });
  }
}

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUser(id);

    res.status(200).json({
      status: "Success",
      data: user
    });
  } catch (error) {
    res.status(error.statusCode || 400).json({
      status: "Error",
      message: error.message
    });
  }
}

const updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req);

    res.status(200).json({
      status: "Success",
      message: "Data pengguna telah berhasil diperbarui.",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone_number: user.phone_number,
        token: user.token,
      }
    });
  } catch (error) {
    res.status(error.statusCode || 400).json({
      status: "Error",
      message: error.message
    });
  }
}

module.exports = {
  getUsers,
  getUser,
  updateUser
}