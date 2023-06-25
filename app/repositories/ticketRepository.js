const { Ticket } = require("../models");

exports.createTicket = (createArgs) => {
    return Ticket.create(createArgs);
};

exports.getAllTicket = () => {
    return Ticket.findAll();
};
  
exports.getTicketById = (ticketId) => {
    return Ticket.findOne({ where: { id: ticketId } });
};

exports.getDetailTicket = (ticketId) => {
    return Ticket.findByPk(ticketId, {
      paranoid: false,
    });
};

exports.getTicketBySearch = (location_from, location_to, departure_time, arrival_time, passengers) => {
    return Ticket.findAll({
        where: {
            location_from: location_from,
            location_to: location_to,
            departure_time: departure_time,
            arrival_time: arrival_time,
            passengers: passengers
        }
    });
};

