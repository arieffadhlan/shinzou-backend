const airportRepository = require("../repositories/airport-repository");
const ApplicationError = require("../errors/ApplicationError");

const getAirports = async () => {
  try {
    const airports = await airportRepository.getAirports();    
    return airports;
  } catch (error) {
    if (error instanceof ApplicationError) {
      throw new ApplicationError(error.statusCode, error.message);
    } else {
      throw new Error(error.message);
    }
  }
}

const getAirport = async (id) => {
  try {
    const airport = await airportRepository.getAirport(id);
    if (!airport) {
      throw new ApplicationError(404, "Bandara tidak ditemukan.");
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

const addAirport = async (req) => {
  try {
    const { airport_code, airport_name, location, location_acronym } = req.body;
    if (!airport_code || !airport_name || !location || !location_acronym) {
      throw new ApplicationError(404, "kode, nama, dan lokasi bandara wajib diisi.");
    }

    const airport = await airportRepository.addAirport({
      airport_code,
      airport_name,
      location,
      location_acronym
    });
    
    return airport;
  } catch (error) {
    if (error instanceof ApplicationError) {
      throw new ApplicationError(error.statusCode, error.message);
    } else {
      throw new Error(error.message);
    }
  }
}

const updateAirport = async (req) => {
  try {
    const { id } = req.params;
    const { airport_code, airport_name, location, location_acronym } = req.body;

    if (!airport_code || !airport_name || !location || !location_acronym) {
      throw new ApplicationError(404, "kode, nama, dan lokasi bandara wajib diisi.");
    }

    const airport = await getAirport(id);
    return await airportRepository.updateAirport(airport.id, {
      airport_code,
      airport_name,
      location,
      location_acronym
    });
  } catch (error) {
    if (error instanceof ApplicationError) {
      throw new ApplicationError(error.statusCode, error.message);
    } else {
      throw new Error(error.message);
    }
  }
}

const deleteAirport = async (id) => {
  try {
    const airport = await getAirport(id);
    return await airportRepository.deleteAirport(airport.id);
  } catch (error) {
    if (error instanceof ApplicationError) {
      throw new ApplicationError(error.statusCode, error.message);
    } else {
      throw new Error(error.message);
    }
  }
}

module.exports = {
  getAirports,
  getAirport,
  addAirport,
  updateAirport,
  deleteAirport
}