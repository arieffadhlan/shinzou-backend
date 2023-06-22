const flightService = require("../services/flight-service");

const getFlights = async (req, res) => {
  try {
    const flights = await flightService.getFlights();

    res.status(200).json({
      status: "Success",
      data: flights
    });
  } catch (error) {
    res.status(error.statusCode || 400).json({
      status: "Error",
      message: error.message
    });
  }
}

const getFlight = async (req, res) => {
  try {
    const { id } = req.params;
    const flight = await flightService.getFlight(id);

    res.status(200).json({
      status: "Success",
      data: flight
    });
  } catch (error) {
    res.status(error.statusCode || 400).json({
      status: "Error",
      message: error.message
    });
  }
}

const addFlight = async (req, res) => {
  try {
    const flight = await flightService.addFlight(req);

    res.status(201).json({
      status: "Success",
      message: "Data penerbangan telah berhasil ditambahkan.",
      data: flight
    });
  } catch (error) {
    res.status(error.statusCode || 400).json({
      status: "Error",
      message: error.message
    });
  }
}

const updateFlight = async (req, res) => {
  try {
    await flightService.updateFlight(req);

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

const deleteFlight = async (req, res) => {
  try {
    const { id } = req.params;
    await flightService.deleteFlight(id);

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
  getFlights,
  getFlight,
  addFlight,
  updateFlight,
  deleteFlight
}