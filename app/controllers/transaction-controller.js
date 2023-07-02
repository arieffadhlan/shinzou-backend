const transactionService = require("../services/transaction-service");

const getTransactions = async (req, res) => {
  try {
    const transactions = await transactionService.getTransactions();

    res.status(200).json({
      status: "Success",
      data: transactions
    });
  } catch (error) {
    res.status(error.statusCode || 400).json({
      status: "Error",
      message: error.message
    });
  }
}

const getTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await transactionService.getTransaction(id);

    res.status(200).json({
      status: "Success",
      data: transaction
    });
  } catch (error) {
    res.status(error.statusCode || 400).json({
      status: "Error",
      message: error.message
    });
  }
}

const addTransaction = async (req, res) => {
  try {
    const transaction = await transactionService.addTransaction(req);

    res.status(200).json({
      status: "Success",
      message: "Data transaksi telah berhasil disimpan.",
      data: transaction
    });
  } catch (error) {
    res.status(error.statusCode || 400).json({
      status: "Error",
      message: error.message
    });
  }
}

const addPayment = async (req, res) => {
  try {
    await transactionService.addPayment(req);

    res.status(200).json({
      status: "Success",
      message: "Pembayaran telah berhasil"
    });
  } catch (error) {
    res.status(error.statusCode || 400).json({
      status: "Error",
      message: error.message
    });
  }
}

module.exports = {
  getTransactions,
  getTransaction,
  addTransaction,
  addPayment
}