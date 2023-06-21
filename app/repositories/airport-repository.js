const { Airport } = require("../models");

const getAirports = () => {
  return Airport.findAll();
}

const getAirport = (id) => {
  return Airport.findByPk(id);
}

const addAirport = (data) => {
  return Airport.create(data);
}

const updateAirport = (id, data) => {
  return Airport.update(data, 
    { where: { id } 
  });
}

const deleteAirport = (id) => {
  return Airport.destroy({ where: { id } });
}

module.exports = {
  getAirports,
  getAirport,
  addAirport,
  updateAirport,
  deleteAirport
}