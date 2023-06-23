const { Ticket } = require("../models");

const createTicket = (createArgs) => {
    return Ticket.create(createArgs); 
};

const getAllTicket = () => {
    return Ticket.findAll();
};
  
const getTicketById = (ticketId) => {
    return Ticket.findOne({ where: { id: ticketId } });
};

const getDetailTicket = (ticketId) => {
    return Ticket.findByPk(ticketId, {
      paranoid: false,
    });
};
// ,location_to, departure_time, arrival_time, passengers
const getTicketBySearch = (location_from) => {
    return Ticket.findAll({
        where: {
            location_from: location_from,
            // location_to: location_to,
            // departure_time: departure_time,
            // arrival_time: arrival_time,
            // passengers: passengers
        }
    });
};


module.exports = {
    createTicket,
    getAllTicket,
    getDetailTicket,
    getTicketById,
    getTicketBySearch
  }
