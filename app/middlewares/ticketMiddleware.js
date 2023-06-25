const { ticketService } = require("../services");

exports.checkTicket = async (req, res, next) => {
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

exports.checkTicketSearch = async (req, res, next) => {
  try {
    const location_from = req.params.location_from;
    const location_to = req.params.location_to;
    const departure_time = req.params.departure_time;
    const arrival_time = req.params.arrival_time;
    const passengers = req.params.passengers;

    const ticketPayload = await ticketService.getTicketBySearch(location_from, location_to, departure_time, arrival_time, passengers);
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


exports.checkTicketQuery = async (req, res, next) => {
    try {
    const location_from = req.query.location_from;
    const location_to = req.query.location_to;
    const departure_time = req.query.departure_time;
    const arrival_time = req.query.arrival_time;
    const passengers = req.query.passengers;
    const ticketPayload = await ticketService.getTicketByQuery(location_from, location_to, departure_time, arrival_time, passengers);
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
    console.log(err);
    res.status(500).json({
      status: "FAIL",
      message: "server error!",
    });
  }
};
    








