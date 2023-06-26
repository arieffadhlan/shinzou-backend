const { Seat } = require("../models");

const getSeats = () => {
  return Seat.findAll();
}

const getSeat = (id) => {
  return Seat.findByPk(id);
}

const addSeat = (data) => {
  return Seat.create(data);
}

const updateSeat = (id, data) => {
  return Seat.update(data, 
    { where: { id } 
  });
}

const deleteSeat = (id) => {
  return Seat.destroy({ where: { id } });
}

module.exports = {
  getSeats,
  getSeat,
  addSeat,
  updateSeat,
  deleteSeat
}