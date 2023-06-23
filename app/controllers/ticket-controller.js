const ticketService  = require ("../services/ticket-service");

const getAllTicket = async (req, res) => {
  
    try {
      
        const ticketPayload = await ticketService.getAllTicket();
        console.log(ticketPayload);
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

const getTicket = async (req, res) => {
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

  const getDetailTicket = async (req, res) => {
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

const getTicketBySearch = async (req, res) => {
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

module.exports = {
  getAllTicket,
  getDetailTicket,
  getTicket,
  getTicketBySearch
}
 