const { Airline } = require("../models");

const getAirlines = () => {
  return Airline.findAll();
}

const getAirline = (id) => {
  return Airline.findByPk(id);
}

const addAirline = (data) => {
  return Airline.create(data);
}

const updateAirline = (id, data) => {
  return Airline.update(data, 
    { where: { id } 
  });
}

const deleteAirline = (id) => {
  return Airline.destroy({ where: { id } });
}

module.exports = {
  getAirlines,
  getAirline,
  addAirline,
  updateAirline,
  deleteAirline
}