const { User } = require("../models");

const getUsers = () => {
  return User.findAll();
}

const getUser = (id) => {
  return User.findByPk(id);
}

const getUserByEmail = (email) => {
  return User.findOne({
    where: { email }
  });
}

const getUserByOTP = (otp) => {
  return User.findOne({
    where: { otp }
  });

}
const getUserByToken = (token) => {
  return User.findOne({
    where: { token }
  });
}

const createUser = (data) => {
  return User.create(data);
}

const updateUser = (id, args) => {
  return User.update(args, {
    where: { id }
  });
}

module.exports = {
  getUsers,
  getUser,
  getUserByEmail,
  getUserByOTP,
  getUserByToken,
  createUser,
  updateUser
}