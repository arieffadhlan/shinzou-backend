const airlineRepository = require("../repositories/airline-repository");
const ApplicationError = require("../errors/ApplicationError");

const getAirlines = async () => {
  try {
    const airports = await airlineRepository.getAirlines();
    if (!airports) {
      throw new ApplicationError(404, "Pesawat tidak ditemukan.");
    } 
    
    return airports;
  } catch (error) {
    if (error instanceof ApplicationError) {
      throw new ApplicationError(error.statusCode, error.message);
    } else {
      throw new Error(error.message);
    }
  }
}

const getAirline = async (id) => {
  try {
    const airport = await airlineRepository.getAirline(id);
    if (!airport) {
      throw new ApplicationError(404, "Pesawat tidak ditemukan.");
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

const addAirline = async (req) => {
  try {
    const { airline_code, airline_name, airline_image } = req.body;
    if (!airline_code || !airline_name || !airline_image) {
      throw new ApplicationError(404, "kode, nama, gambar pesawat wajib diisi.");
    }

    const airport = await airlineRepository.addAirline({
      airline_code,
      airline_name,
      airline_image,
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

const updateAirline = async (req) => {
  try {
    const { id } = req.params;
    const { airline_code, airline_name, airline_image } = req.body;

    if (!airline_code || !airline_name || !airline_image) {
      throw new ApplicationError(404, "kode, nama, gambar pesawat wajib diisi.");
    }

    const airport = await getAirline(id);
    return await airlineRepository.updateAirline(airport.id, {
      airline_code,
      airline_name,
      airline_image,
    });
  } catch (error) {
    if (error instanceof ApplicationError) {
      throw new ApplicationError(error.statusCode, error.message);
    } else {
      throw new Error(error.message);
    }
  }
}

const deleteAirline = async (id) => {
  try {
    const airport = await getAirline(id);
    return await airlineRepository.deleteAirline(airport.id);
  } catch (error) {
    if (error instanceof ApplicationError) {
      throw new ApplicationError(error.statusCode, error.message);
    } else {
      throw new Error(error.message);
    }
  }
}

module.exports = {
  getAirlines,
  getAirline,
  addAirline,
  updateAirline,
  deleteAirline
}