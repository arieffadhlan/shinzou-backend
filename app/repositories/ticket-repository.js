const { Ticket } = require("../models");

const getTickets = () => {
  return Ticket.findAll();
}

const getTicket = (id) => {
  return Ticket.findByPk(id);
}

const addTicket = (data) => {
  return Ticket.create(data);
}

const updateTicket = (id, data) => {
  return Ticket.update(data, 
    { where: { id } 
  });
}

const deleteTicket = (id) => {
  return Ticket.destroy({ where: { id } });
}

module.exports = {
  getTickets,
  getTicket,
  addTicket,
  updateTicket,
  deleteTicket
}