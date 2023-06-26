const { Op } = require("sequelize");
const { Airline, Airport, Flight } = require("../models");

const getFlights = () => {
  return Flight.findAll({
    include: [
      {
        model: Airport,
        as: "originAirport"
      },
      {
        model: Airport,
        as: "destinationAirport"
      },
      {
        model: Airline,
        as: "airline"
      },
    ]
  });
}

const getFlight = (id) => {
  return Flight.findByPk(id, {
    include: [
      {
        model: Airport,
        as: "originAirport"
      },
      {
        model: Airport,
        as: "destinationAirport"
      },
      {
        model: Airline,
        as: "airline"
      },
    ]
  });
}

const searchFlight = (data) => {
  return Flight.findAll({
    where: {
      ...data,
      capacity: {
        [Op.gte]: data.capacity, 
      },
    },
    include: [
      {
        model: Airport,
        as: "originAirport"
      },
      {
        model: Airport,
        as: "destinationAirport"
      },
      {
        model: Airline,
        as: "airline"
      },
    ]
  });
}

const addFlight = (data) => {
  return Flight.create(data);
}

const updateFlight = (id, data) => {
  return Flight.update(data, 
    { where: { id } 
  });
}

const deleteFlight = (id) => {
  return Flight.destroy({ where: { id } });
}

module.exports = {
  getFlights,
  getFlight,
  searchFlight,
  addFlight,
  updateFlight,
  deleteFlight
}