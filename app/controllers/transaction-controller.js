const transactionService = require("../services/transaction-service");

const addTransaction = async (req, res) => {
  try {
    const transactions = await transactionService.addTransaction(req);

    res.status(200).json({
      status: "Success",
      message: "Data transaksi telah berhasil disimpan.",
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
  addTransaction,
  addPayment
}