const transactionService = require("../services/transaction-service");

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

module.exports = {
  addTransaction,
}