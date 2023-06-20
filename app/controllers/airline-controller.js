const airlineService = require("../services/airline-service");

const getAirlines = async (req, res) => {
  try {
    const airlines = await airlineService.getAirlines();

    res.status(200).json({
      status: "Success",
      data: airlines
    });
  } catch (error) {
    res.status(error.statusCode || 400).json({
      status: "Error",
      message: error.message
    });
  }
}

const getAirline = async (req, res) => {
  try {
    const { id } = req.params;
    const airline = await airlineService.getAirline(id);

    res.status(200).json({
      status: "Success",
      data: airline
    });
  } catch (error) {
    res.status(error.statusCode || 400).json({
      status: "Error",
      message: error.message
    });
  }
}

const addAirline = async (req, res) => {
  try {
    const airline = await airlineService.addAirline(req);

    res.status(201).json({
      status: "Success",
      message: "Data pesawat telah berhasil ditambahkan.",
      data: airline
    });
  } catch (error) {
    res.status(error.statusCode || 400).json({
      status: "Error",
      message: error.message
    });
  }
}

const updateAirline = async (req, res) => {
  try {
    await airlineService.updateAirline(req);

    res.status(200).json({
      status: "Success",
      message: "Data pesawat telah berhasil diperbarui.",
    });
  } catch (error) {
    res.status(error.statusCode || 400).json({
      status: "Error",
      message: error.message
    });
  }
}

const deleteAirline = async (req, res) => {
  try {
    const { id } = req.params;
    await airlineService.deleteAirline(id);

    res.status(200).json({
      status: "Success",
      message: "Data pesawat telah berhasil dihapus.",
    });
  } catch (error) {
    res.status(error.statusCode || 400).json({
      status: "Error",
      message: error.message
    });
  }
}

module.exports = {
  getAirlines,
  getAirline,
  addAirline,
  updateAirline,
  deleteAirline
}