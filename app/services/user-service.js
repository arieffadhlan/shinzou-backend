const userRepository = require("../repositories/user-repository");
const ApplicationError = require("../errors/ApplicationError");

const getUsers = async () => {
  try {
    const users = await userRepository.getUsers();
    if (!users) {
      throw new ApplicationError(404, "Pengguna tidak ditemukan.");
    } 
    
    return users;
  } catch (error) {
    if (error instanceof ApplicationError) {
      throw new ApplicationError(error.statusCode, error.message);
    } else {
      throw new Error(error.message);
    }
  }
}

const getUser = async (id) => {
  try {
    const user = await userRepository.getUser(id);
    if (!user) {
      throw new ApplicationError(404, "Pengguna tidak ditemukan.");
    } 
    
    return user;
  } catch (error) {
    if (error instanceof ApplicationError) {
      throw new ApplicationError(error.statusCode, error.message);
    } else {
      throw new Error(error.message);
    }
  }
}

module.exports = {
  getUsers,
  getUser,
}