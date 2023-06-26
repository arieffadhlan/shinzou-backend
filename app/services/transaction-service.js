const mailService = require("./mail-service");
const passengerRepository = require("../repositories/passenger-repository");
const seatRepository = require("../repositories/seat-repository");
const transactionRepository = require("../repositories/transaction-repository");
const ticketRepository = require("../repositories/ticket-repository");
const ApplicationError = require("../errors/ApplicationError");

const generateBookingCode = () => {
  const char = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  let bookingCode = "";
  for (let i = 0; i < 9; i++) {
    bookingCode += char[(Math.floor(Math.random() * char.length))];
  }
  return bookingCode;
}

const getTransactions = async () => {
  try {
    const transactions = await transactionRepository.getTransactions();
    return transactions;
  } catch (error) {
    if (error instanceof ApplicationError) {
      throw new ApplicationError(error.statusCode, error.message);
    } else {
      throw new Error(error.message);
    }
  }
}

const getTransaction = async (id) => {
  try {
    const transaction = await transactionRepository.getTransaction(id);
    return transaction;
  } catch (error) {
    if (error instanceof ApplicationError) {
      throw new ApplicationError(error.statusCode, error.message);
    } else {
      throw new Error(error.message);
    }
  }
}

const addTransaction = async (req) => {
  try {
    const { flight_id, passengers, ammount } = req.body;
    const { id, email, name } = req.user;
    const booking_code = generateBookingCode();

    const transaction = await transactionRepository.addTransaction({
      flight_id,
      user_id: id,
      booking_code,
      ammount
    });

    passengers.map(async (passengerData) => {
      const passenger = await passengerRepository.addPassenger({
        title: passengerData.title,
        name: passengerData.name,
        family_name: passengerData.family_name ? passengerData.family_name : null,
        phone_number: passengerData.phone_number
      });
  
      const seat = await seatRepository.addSeat({
        flight_id,
        seat_number: passengerData.seat_number
      });

      await ticketRepository.addTicket({
        transaction_id: transaction.id,
        passenger_id: passenger.id,
        seat_id: seat.id,
      });
    });

    // Send payment confirmation to email
    return await mailService.sendMail(email, "Konfirmasi Pembayaran",
      `
        <div style="font-size: 14px;">
          <span>Hai ${name},</span> <br /> <br />
          <span>
            Terima kasih telah membeli tiket pesawat di <strong>Shinzou</strong>. Untuk menyelesaikan pemesanan, kamu diharapkan melakukan pembayaran melalui salah satu metode pembayaran dibawah ini.
          </span>
          <ul style="padding-left: 8px;">
            <li>Gopay</li>
            <li>Virtual Account</li>
            <li>Credit Card</li>
          </ul>
          <span>Setelah melakukan pembayaran, silakan konfirmasi pembayaran kamu dengan menekan tombol berikut.</span> <br /> <br />
          <a href="http://localhost:3000/payment/${booking_code}" style="color: #222">Konfirmasi Pembayaran</a> <br /> <br />
          <span>Terima kasih,</span> <br />
          <span>Tim Shinzou</span>
        </div>
      `
    );
  } catch (error) {
    if (error instanceof ApplicationError) {
      throw new ApplicationError(error.statusCode, error.message);
    } else {
      throw new Error(error.message);
    }
  }
}

const addPayment = async (req) => {
  try {
    const { booking_code } = req.params;
    const { payment_method } = req.body;
    const { email, name } = req.user;

    const transaction = await transactionRepository.updateTransactionByBookingCode(booking_code, { 
      payment_method
    });

    // Send payment success to email
    return await mailService.sendMail(email, "Konfirmasi Pembayaran Diterima",
    `
      <div style="font-size: 14px;">
        <span>Hai ${name},</span> <br /> <br />
        <span>
          Terima kasih telah melakukan konfirmasi pembayaran. Pembayaran kamu telah kami <strong>Terima</strong>.
        </span>
        <ul style="padding-left: 8px;">
          <li>Nama Pemesan: ${name}</li>
          <li>Booking Code: ${booking_code}</li>
          <li>Metode Pembayaran: ${payment_method}</li>
        </ul>
        <span>Terima kasih,</span> <br />
        <span>Tim Shinzou</span>
      </div>
    `
  );
    
    return transaction;
  } catch (error) {
    if (error instanceof ApplicationError) {
      throw new ApplicationError(error.statusCode, error.message);
    } else {
      throw new Error(error.message);
    }
  }
}

module.exports = {
  getTransactions,
  getTransaction,
  addTransaction,
  addPayment
}