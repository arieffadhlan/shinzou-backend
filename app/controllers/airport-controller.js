const airportService = require("../services/airport-service");

const getAirports = async (req, res) => {
  try {
    const airports = await airportService.getAirports();

    res.status(200).json({
      status: "Success",
      data: airports
    });
  } catch (error) {
    res.status(error.statusCode || 400).json({
      status: "Error",
      message: error.message
    });
  }
}

const getAirport = async (req, res) => {
  try {
    const { id } = req.params;
    const airport = await airportService.getAirport(id);

    res.status(200).json({
      status: "Success",
      data: airport
    });
  } catch (error) {
    res.status(error.statusCode || 400).json({
      status: "Error",
      message: error.message
    });
  }
}

const addAirport = async (req, res) => {
  try {
    const airport = await airportService.addAirport(req);

    res.status(201).json({
      status: "Success",
      message: "Data bandara telah berhasil ditambahkan.",
      data: airport
    });
  } catch (error) {
    res.status(error.statusCode || 400).json({
      status: "Error",
      message: error.message
    });
  }
}

const updateAirport = async (req, res) => {
  try {
    await airportService.updateAirport(req);

    res.status(200).json({
      status: "Success",
      message: "Data bandara telah berhasil diperbarui.",
    });
  } catch (error) {
    res.status(error.statusCode || 400).json({
      status: "Error",
      message: error.message
    });
  }
}

const deleteAirport = async (req, res) => {
  try {
    const { id } = req.params;
    await airportService.deleteAirport(id);

    res.status(200).json({
      status: "Success",
      message: "Data bandara telah berhasil dihapus.",
    });
  } catch (error) {
    res.status(error.statusCode || 400).json({
      status: "Error",
      message: error.message
    });
  }
}

module.exports = {
  getAirports,
  getAirport,
  addAirport,
  updateAirport,
  deleteAirport
}