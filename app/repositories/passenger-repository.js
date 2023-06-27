const { Passenger } = require("../models");

const getPassengers = () => {
  return Passenger.findAll();
}

const getPassenger = (id) => {
  return Passenger.findByPk(id);
}

const getPassengerByIdentityNumber = (identity_number) => {
  return Passenger.findOne({
    where: { identity_number }
  });
}

const addPassenger = (data) => {
  return Passenger.create(data);
}

const updatePassenger = (id, data) => {
  return Passenger.update(data, 
    { where: { id } 
  });
}

const deletePassenger = (id) => {
  return Passenger.destroy({ where: { id } });
}

module.exports = {
  getPassengers,
  getPassenger,
  getPassengerByIdentityNumber,
  addPassenger,
  updatePassenger,
  deletePassenger
}