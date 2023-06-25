const { Transaction } = require("../models");

const getTransactions = () => {
  return Transaction.findAll();
}

const getTransaction = (id) => {
  return Transaction.findByPk(id);
}

const addTransaction = (data) => {
  return Transaction.create(data);
}

const updateTransaction = (id, data) => {
  return Transaction.update(data, 
    { where: { id } 
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
  deleteTransaction
}