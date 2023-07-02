const { 
  Airline, 
  Airport, 
  Flight, 
  Passenger, 
  Seat, 
  Transaction, 
  Ticket, 
  User 
} = require("../models");

const getTransactions = () => {
  return Transaction.findAll({
    include: [
      {
        model: Flight,
        as: "departureFlight",
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        },
        include: [
          {
            model: Airline,
            as: "airline"
          },
          {
            model: Airport,
            as: "originAirport"
          },
          {
            model: Airport,
            as: "destinationAirport"
          },
        ]
      },
      {
        model: Flight,
        as: "returnFlight",
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        },
        include: [
          {
            model: Airline,
            as: "airline"
          },
          {
            model: Airport,
            as: "originAirport"
          },
          {
            model: Airport,
            as: "destinationAirport"
          },
        ]
      },
      {
        model: User,
        as: "user",
        attributes: ["name"]
      },
      {
        model: Ticket,
        as: "tickets",
        include: [
          {
            model: Passenger,
            as: "passenger",
            attributes: {
              exclude: ["id", "createdAt", "updatedAt"]
            },
          },
          {
            model: Seat,
            as: "seat",
            attributes: {
              exclude: ["createdAt", "updatedAt"]
            },
          },
        ]
      }
    ]
  });
}

const getTransaction = (id) => {
  return Transaction.findByPk(id, {
    include: [
      {
        model: Flight,
        as: "departureFlight",
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        },
        include: [          
          {
            model: Airline,
            as: "airline"
          },
          {
            model: Airport,
            as: "originAirport",
            attributes: {
              exclude: ["id", "createdAt", "updatedAt"]
            },
          },
          {
            model: Airport,
            as: "destinationAirport",
            attributes: {
              exclude: ["id", "createdAt", "updatedAt"]
            },
          },
        ]
      },
      {
        model: Flight,
        as: "returnFlight",
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        },
        include: [          
          {
            model: Airline,
            as: "airline"
          },
          {
            model: Airport,
            as: "originAirport",
            attributes: {
              exclude: ["id", "createdAt", "updatedAt"]
            },
          },
          {
            model: Airport,
            as: "destinationAirport",
            attributes: {
              exclude: ["id", "createdAt", "updatedAt"]
            },
          },
        ]
      },
      {
        model: User,
        as: "user",
        attributes: ["name"]
      },
      {
        model: Ticket,
        as: "tickets",
        include: [
          {
            model: Passenger,
            as: "passenger",
            attributes: {
              exclude: ["id", "createdAt", "updatedAt"]
            },
          },
          {
            model: Seat,
            as: "seat",
            attributes: {
              exclude: ["createdAt", "updatedAt"]
            },
          },
        ]
      }
    ]
  });
}

const addTransaction = (data) => {
  return Transaction.create(data);
}

const updateTransaction = (id, data) => {
  return Transaction.update(data, 
    { where: { id } 
  });
}

const updateTransactionByBookingCode = (booking_code, data) => {
  return Transaction.update(data, 
    { where: { booking_code } 
  });
}

const deleteTransaction = (id) => {
  return Transaction.destroy({ where: { id } });
}

module.exports = {
  getTransactions,
  getTransaction,
  addTransaction,
  updateTransaction,
  updateTransactionByBookingCode,
  deleteTransaction
}