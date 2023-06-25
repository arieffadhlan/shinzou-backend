const { ticketService } = require ("../services");
const ApplicationError = require("../errors/ApplicationError");

exports.getAllTicket = async (req, res) => {
    try {
        const ticketPayload = await ticketService.getAllTicket();
        res.status(200).json({
            status: "OK",
            message: "Succes",
            data: ticketPayload,
        });
    } catch (err) {
        res.status(err.statusCode).json({
            status: "FAIL",
            message: err.message,
        });
    }
};

exports.getTicket = async (req, res) => {
    try {
      const ticket = req.ticket; 
      res.status(200).json({
        status: "OK",
        message: "Success",
        data: ticket,
      });
    } catch (err) {
      res.status(err.statusCode).json({
        status: "FAIL",
        message: err.message,
      });
    }
  };

  exports.getDetailTicket = async (req, res) => {
    try {
      const ticketId = req.params.id; //from params
      const ticketPayload = await ticketService.getDetailTicket(ticketId);
      res.status(200).json({
        status: "OK",
        message: "Success",
        data: ticketPayload,
      });
    } catch (err) {
      res.status(err.statusCode).json({
        status: "FAIL",
        message: err.message,
      });
    }
  };

exports.getTicketBySearch = async (req, res) => {
  try {
    const ticket = req.ticket;
    res.status(200).json({
      status: "OK",
      message: "Success",
      data: ticket,
    });
  } catch (err) {
    res.status(err.statusCode).json({
      status: "FAIL",
      message: err.message,
    });
  }
};

exports.getTicketByQuery = async (req, res) => {
  try {
    const ticket = req.ticket;
    res.status(200).json({
      status: "OK",
      message: "Success",
      data: ticket,
    });
  } catch (err) {
    res.status(err.statusCode).json({
      status: "FAIL",
      message: err.message,
    });
  }
};

