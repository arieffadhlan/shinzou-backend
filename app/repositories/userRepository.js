const { User } = require("../models");

const getUser = (id) => {
  return User.findByPk(id);
}

const getUserByEmail = (email) => {
  return User.findOne({
    where: { email }
  });
}

const createUser = (data) => {
  return User.create(data);
}

module.exports = {
  getUser,
  getUserByEmail,
  createUser
}