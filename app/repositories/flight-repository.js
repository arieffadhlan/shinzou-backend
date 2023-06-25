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
      origin_airport_id: data.location_from,
      destination_airport_id: data.location_to,
      departure_datetime: data.departure_datetime,
      capacity: {
        [Op.gte]: data.passangers, 
      },
      class: data.seat_class
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