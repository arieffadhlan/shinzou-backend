const { User } = require("../models");

const getUser = (id) => {
  return User.findByPk(id);
}

const getUserByEmail = (email) => {
  return User.findOne({
    where: { email }
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
  getUser,
  getUserByEmail,
  getUserByToken,
  createUser,
  updateUser
}