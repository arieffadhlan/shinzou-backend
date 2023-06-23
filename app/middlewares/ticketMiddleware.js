const  ticketMiddleware  = require("../middlewares");
const  ticketService = require("../services/ticket-service");
const ApplicationError = require("../errors/ApplicationError");

const checkTicket = async (req, res, next) => {
    try{
        const id = req.params.id;
        const ticketPayload = await ticketService.getTicketById(id);

        if(!ticketPayload) {
            res.status(404).json({
                status: "FAIL",
                message: `ticket not found!`,
              });
              return;
        }
        req.ticket = ticketPayload;
        next();
    } catch (err) {
        res.status(500).json({
          status: "FAIL",
          message: "server error!",
    });
  }
};

const checkTicketSearch = async (req, res, next) => {
  try {
    const location_from = req.params.location_from;
    // const location_to = req.params.location_to;
    // const departure_time = req.params.departure_time;
    // const arrival_time = req.params.arrival_time;
    // const passengers = req.params.passengers;
    // ,location_to, departure_time , arrival_time, passengers
    const ticketPayload = await ticketService.getTicketBySearch(location_from);
    if(!ticketPayload) {
      res.status(404).json({
        status: "FAIL",
        message: `ticket not found!`, 
      });
      return;
    }
    req.ticket = ticketPayload;
    next();
  } catch (err) {
    res.status(500).json({
      status: "FAIL",
      message: "server error!1",
    });
  }
};

module.exports = checkTicketSearch;



