const { Flight, Passenger, Seat, Transaction, Ticket, User } = require("../models");

const getTransactions = () => {
  return Transaction.findAll({
    include: [
      {
        model: User,
        as: "user"
      },
      {
        model: Flight,
        as: "flight"
      },
      {
        model: Ticket,
        as: "tickets",
        include: [
          {
            model: Passenger,
            as: "passenger"
          },
          {
            model: Seat,
            as: "seat"
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
        model: User,
        as: "user"
      },
      {
        model: Flight,
        as: "flight"
      },
      {
        model: Ticket,
        as: "tickets",
        include: [
          {
            model: Passenger,
            as: "passenger"
          },
          {
            model: Seat,
            as: "seat"
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