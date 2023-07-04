const airlineRepository = require("../repositories/airline-repository");
const airportRepository = require("../repositories/airport-repository");
const flightRepository = require("../repositories/flight-repository");
const ApplicationError = require("../errors/ApplicationError");

const checkRequiredValue = (object) => {
  for (const property in object) {
    if (object[property] === "") return true;
  }
  return false;
}

const getFlights = async () => {
  try {
    const flights = await flightRepository.getFlights();    
    return flights;
  } catch (error) {
    if (error instanceof ApplicationError) {
      throw new ApplicationError(error.statusCode, error.message);
    } else {
      throw new Error(error.message);
    }
  }
}

const getFlight = async (id) => {
  try {
    const airport = await flightRepository.getFlight(id);
    if (!airport) {
      throw new ApplicationError(404, "Penerbangan tidak ditemukan.");
    } 
    
    return airport;
  } catch (error) {
    if (error instanceof ApplicationError) {
      throw new ApplicationError(error.statusCode, error.message);
    } else {
      throw new Error(error.message);
    }
  }
}

const searchFlight = async (req) => {
  try {
    const { 
      location_from, 
      location_to, 
      departure_date,
      passengers, 
      seat_class 
    } = req.query

    const originAirport = await airportRepository.getAirportByName(location_from);
    const destinationAirport = await airportRepository.getAirportByName(location_to);
    
    const flights = await flightRepository.searchFlight({
      origin_airport_id: originAirport.id,
      destination_airport_id: destinationAirport.id,
      departure_date,
      capacity: parseInt(passengers),
      class: seat_class
    });

    return flights;
  } catch (error) {
    if (error instanceof ApplicationError) {
      throw new ApplicationError(error.statusCode, error.message);
    } else {
      throw new Error(error.message);
    }
  }
}

const addFlight = async (req) => {
  try {
    if (checkRequiredValue(req.body)) {
      throw new ApplicationError(422, "Semua data wajib diisi.");
    }
    
    const { origin_airport_id, destination_airport_id, airline_id } = req.body;
    if (origin_airport_id === destination_airport_id) {
      throw new ApplicationError(422, "Lokasi bandara asal dan tujuan tidak valid.");
    }

    const originAirport = await airportRepository.getAirport(origin_airport_id);
    const destinationAirport = await airportRepository.getAirport(destination_airport_id);
    if (!originAirport || !destinationAirport) {
      throw new ApplicationError(404, "Lokasi bandara asal atau tujuan tidak ditemukan.");
    }

    const airline = await airlineRepository.getAirline(airline_id);
    if (!airline) {
      throw new ApplicationError(422, "Pesawat tidak ditemukan.");
    }

    const flight = await flightRepository.addFlight(req.body);
    
    return flight;
  } catch (error) {
    if (error instanceof ApplicationError) {
      throw new ApplicationError(error.statusCode, error.message);
    } else {
      throw new Error(error.message);
    }
  }
}

const updateFlight = async (req) => {
  try {
    if (checkRequiredValue(req.body)) {
      throw new ApplicationError(422, "Semua data wajib diisi.");
    }
    
    const { id } = req.params;
    const { origin_airport_id, destination_airport_id, airline_id } = req.body;

    if (origin_airport_id === destination_airport_id) {
      throw new ApplicationError(422, "Lokasi bandara asal dan tujuan tidak valid.");
    }

    const originAirport = await airportRepository.getAirport(origin_airport_id);
    const destinationAirport = await airportRepository.getAirport(destination_airport_id);
    if (!originAirport || !destinationAirport) {
      throw new ApplicationError(404, "Lokasi bandara asal atau tujuan tidak ditemukan.");
    }

    const airline = await airlineRepository.getAirline(airline_id);
    if (!airline) {
      throw new ApplicationError(422, "Pesawat tidak ditemukan.");
    }
    
    const flight = await getFlight(id);

    return await flightRepository.updateFlight(flight.id, req.body);
  } catch (error) {
    if (error instanceof ApplicationError) {
      throw new ApplicationError(error.statusCode, error.message);
    } else {
      throw new Error(error.message);
    }
  }
}

const deleteFlight = async (id) => {
  try {
    const flight = await getFlight(id);
    return await flightRepository.deleteFlight(flight.id);
  } catch (error) {
    if (error instanceof ApplicationError) {
      throw new ApplicationError(error.statusCode, error.message);
    } else {
      throw new Error(error.message);
    }
  }
}

module.exports = {
  getFlights,
  getFlight,
  searchFlight,
  addFlight,
  updateFlight,
  deleteFlight
}