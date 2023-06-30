const mailService = require("./mail-service");
const flightRepository = require("../repositories/flight-repository");
const passengerRepository = require("../repositories/passenger-repository");
const seatRepository = require("../repositories/seat-repository");
const transactionRepository = require("../repositories/transaction-repository");
const ticketRepository = require("../repositories/ticket-repository");
const ApplicationError = require("../errors/ApplicationError");

const generateBookingCode = (length) => {
  const char = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  let bookingCode = "";

  for (let i = 0; i < length; i++) {
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

const saveTransactionData = async (data) => {
  const { flight_id, transaction_id, passengers } = data;

  await Promise.all(passengers.map(async (item) => {
    let passenger = await passengerRepository.getPassengerByIdentityNumber(item.identity_number);
    
    if (!passenger) {
      passenger = await passengerRepository.addPassenger({
        title: item.title,
        name: item.name,
        identity_number: item.identity_number,
        family_name: item.family_name ? item.family_name : null,
        phone_number: item.phone_number
      });
    }

    const seat = await seatRepository.addSeat({
      flight_id,
      seat_number: item.seat_number
    });

    await ticketRepository.addTicket({
      transaction_id,
      passenger_id: passenger.id,
      seat_id: seat.id,
    });
  }));
}

const addTransaction = async (req) => {
  try {
    const { departure_flight_id, return_flight_id, passengers, ammount } = req.body;
    const { id, email, name } = req.user;
    const booking_code = generateBookingCode(9);

    // Save ticket transaction
    const transaction = await transactionRepository.addTransaction({
      departure_flight_id,
      return_flight_id,
      user_id: id,
      booking_code,
      ammount
    });    

    // reduce the capacity based on the number of passengers
    const departureFlight = await flightRepository.getFlight(departure_flight_id);
    await flightRepository.updateFlight(departureFlight.id, {
      capacity: departureFlight.capacity -= passengers.length
    });

    // Save departure Ticket
    await saveTransactionData({
      flight_id: departure_flight_id,
      transaction_id: transaction.id,
      passengers
    });
    
    if (return_flight_id) {
      // reduce the capacity based on the number of passengers
      const returnFlight = await flightRepository.getFlight(return_flight_id);
      await flightRepository.updateFlight(returnFlight.id, {
        capacity: returnFlight.capacity -= passengers.length
      });
      
      // Save departure Ticket
      await saveTransactionData({
        flight_id: return_flight_id,
        transaction_id: transaction.id,
        passengers
      });
    }

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