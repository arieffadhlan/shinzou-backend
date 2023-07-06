const dayjs = require("dayjs");
const mailService = require("./mail-service");
const flightRepository = require("../repositories/flight-repository");
const notificationRepository = require("../repositories/notification-repository");
const passengerRepository = require("../repositories/passenger-repository");
const seatRepository = require("../repositories/seat-repository");
const transactionRepository = require("../repositories/transaction-repository");
const ticketRepository = require("../repositories/ticket-repository");
const userRepository = require("../repositories/user-repository");
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

    // reduce departure flight capacity based on the number of passengers
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
      // reduce return flight capacity based on the number of passengers
      const returnFlight = await flightRepository.getFlight(return_flight_id);
      await flightRepository.updateFlight(returnFlight.id, {
        capacity: returnFlight.capacity -= passengers.length
      });
      
      // Save return Ticket
      await saveTransactionData({
        flight_id: return_flight_id,
        transaction_id: transaction.id,
        passengers
      });
    }

    // Add notification
    await notificationRepository.addNotification({
      user_id: id,
      message: `Anda telah melakukan pemesanan tiket #${booking_code}. Silakan selesaikan pembayaran sekarang juga!`,
    });

    // Send payment confirmation to email
    await mailService.sendMail(email, "Konfirmasi Pembayaran",
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
          <span>Setelah melakukan pembayaran, silakan konfirmasi pembayaran kamu.</span> <br /> <br />
          <span>Terima kasih,</span> <br />
          <span>Tim Shinzou</span>
        </div>
      `
    );

    return transaction
  } catch (error) {
    if (error instanceof ApplicationError) {
      throw new ApplicationError(error.statusCode, error.message);
    } else {
      throw new Error(error.message);
    }
  }
}

const printTicket = async (req) => {
  try {
    const { transaction_id } = req.body;

    const transaction = await getTransaction(transaction_id);
    const user = await userRepository.getUser(transaction.user_id);

    const flightDepartureDate = {
      departure: new Date (`${transaction.departureFlight.departure_date} ${transaction.departureFlight.departure_time}`),
      arrival: new Date (`${transaction.departureFlight.arrival_date} ${transaction.departureFlight.arrival_time}`),
    }

    // Get passengers
    let passengers = [];    
    transaction.tickets.map((ticket) => {
      if (ticket.seat.flight_id === transaction.departure_flight_id) {
        passengers.push({
          name: ticket.passenger.name,
          identity_number: ticket.passenger.identity_number,
          seat_number: ticket.seat.seat_number
        });
      }
    });

    // Send ticket to email
    if (transaction.return_flight_id) {
      await mailService.sendMail(user.email, "Ticket Penerbangan",
        `
          <div style=" display: block; max-width: 900px;margin-left: 15%; margin-right: 15%;">
            <div style="text-align: left; margin: 0 auto; max-width: 600px;">
              <h1 style="font-size: 20px; margin-top: 20px; text-align: center;">Your e-ticket is here!</h1>
              <div style="font-size: 14px; text-align: start">
                <h1 style="font-size: 14px;">
                  Kode Booking: <br> 
                  ${transaction.booking_code}
                </h1>
                <span>
                  Nama: ${user.name}<br>
                  Nomor Telepon: ${user.phone_number}<br>
                  Email: ${user.email}
                </span>
              </div>

              <div style="margin-top: 20px; margin-buttom:0px;  color:#082f49; font-size:16px;">
                <p style="font-weight: 700">Penerbangan Pergi</p>
              </div>
              <table  style="text-align: center; width:100%; border: 5px; cellpadding: 0; cellspacing:0; margin-left: auto; margin-right: auto; border-collapse: collapse; ">
                <tr class="font" align="center" valign="top"  style="padding: 36px 24px; font-weight:700; padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 12px; line-height: 24px; background-color: #d1cece; border-bottom: 3px solid #edebeb; text-align: start; ">
                  <td style="padding: 10px;">Pesawat</td>
                  <td style="padding: 10px;">Tipe</td>
                  <td style="padding: 10px;">Kepergian</td>
                  <td style="padding: 10px;">Kepulangan</td>
                </tr>
                <tr  style="padding:1rem; font-weight:200; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 12px; line-height: 24px;background-color: #eae8e8; text-align: start; ">
                  <td style="padding: 10px;">${transaction.departureFlight.airline.airline_name} <br> (${transaction.departureFlight.airline.airline_code})</</td>
                  <td style="padding: 10px;">${transaction.departureFlight.class}</</td>
                  <td style="padding: 10px;">${new Date (`${transaction.departureFlight.departure_date} ${transaction.departureFlight.departure_time}`)} <br> ${transaction.departureFlight.originAirport.airport_name} (${transaction.departureFlight.originAirport.airport_code}) </</td>
                  <td style="padding: 10px;">${new Date (`${transaction.departureFlight.arrival_date} ${transaction.departureFlight.arrival_time}`)} <br> ${transaction.departureFlight.destinationAirport.airport_name} (${transaction.departureFlight.destinationAirport.airport_code}) </td>
                </tr>
              </table>

              <div style="margin-top: 0px;  color:#082f49; font-size:16px;">
                <p style="font-weight: 700">Penumpang</p>
              </div>
              <div style="text-align: center; widht:100%;">
                <table style="text-align: center; width:100%; border: 1px ; cellpadding: 0; cellspacing:0; margin-left: auto; margin-right: auto; border-collapse: collapse; margin-top:1rem;">
                  <tr style="padding: 36px 24px; font-weight:700; padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 12px; line-height: 24px; background-color: #d1cece; border-bottom: 3px solid #edebeb; text-align: start; ">
                    <td style="padding: 10px;">No</td>
                    <td style="padding: 10px;">Nama</td>
                    <td style="padding: 10px;">No. Identitas</td>
                    <td style="padding: 10px;">Tempat Duduk</td>
                  </tr>
                  ${(passengers).map((passenger, index) => {
                    return `
                        <tr key=${index} style="padding:1rem; font-weight:200; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 12px; line-height: 24px;background-color: #eae8e8; text-align: start; ">
                          <td style="padding: 10px;">${index + 1}</</td>
                          <td style="padding: 10px;">${passenger.name}</</td>
                          <td style="padding: 10px;">${passenger.identity_number}</</td>
                          <td style="padding: 10px;">${passenger.seat_number}</td>
                        </tr>
                      `
                  }).join('')}
                </table>
              </div>

              <div style="margin-top: 10px; margin-buttom:0px;  color:#082f49; font-size:16px;">
                <p style="font-weight: 700">Penerbangan Pulang</p>
              </div>
              <table  style="text-align: center; width:100%; border: 5px; cellpadding: 0; cellspacing:0; margin-left: auto; margin-right: auto; border-collapse: collapse; ">
                <tr class="font" align="center" valign="top"  style="padding: 36px 24px; font-weight:700; padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 12px; line-height: 24px; background-color: #d1cece; border-bottom: 3px solid #edebeb; text-align: start; ">
                  <td style="padding: 10px;">Pesawat</td>
                  <td style="padding: 10px;">Tipe</td>
                  <td style="padding: 10px;">Kepergian</td>
                  <td style="padding: 10px;">Kepulangan</td>
                </tr>
                <tr  style="padding:1rem; font-weight:200; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 12px; line-height: 24px;background-color: #eae8e8; text-align: start; ">
                  <td style="padding: 10px;">${transaction.returnFlight.airline.airline_name} <br> (${transaction.returnFlight.airline.airline_code})</</td>
                  <td style="padding: 10px;">${transaction.returnFlight.class}</</td>
                  <td style="padding: 10px;">${new Date (`${transaction.returnFlight.departure_date} ${transaction.returnFlight.departure_time}`)}<br> ${transaction.returnFlight.originAirport.airport_name} (${transaction.returnFlight.originAirport.airport_code}) </</td>
                  <td style="padding: 10px;">${new Date (`${transaction.returnFlight.arrival_date} ${transaction.returnFlight.arrival_time}`)} <br> ${transaction.returnFlight.destinationAirport.airport_name} (${transaction.returnFlight.destinationAirport.airport_code}) </td>
                </tr>
              </table>

              <div style="margin-top: 0px;  color:#082f49; font-size:16px;">
                <p style="font-weight: 700">Penumpang</p>
              </div>
              <div style="widht:100%;">
                <table style="text-align: center; width:100%; border: 1px ; cellpadding: 0; cellspacing:0; margin-left: auto; margin-right: auto; border-collapse: collapse; ">
                  <tr style="padding: 36px 24px; font-weight:700; padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 12px; line-height: 24px; background-color: #d1cece; border-bottom: 3px solid #edebeb; text-align: start; ">
                    <td style="padding: 10px;">No</td>
                    <td style="padding: 10px;">Nama</td>
                    <td style="padding: 10px;">No. Identitas</td>
                    <td style="padding: 10px;">Tempat Duduk</td>
                  </tr>
                  ${(passengers).map((passenger, index) => {
                    return `
                        <tr key=${index} style="padding:1rem; font-weight:200; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 12px; line-height: 24px;background-color: #eae8e8; text-align: start; ">
                          <td style="padding: 10px;">${index + 1}</</td>
                          <td style="padding: 10px;">${passenger.name}</</td>
                          <td style="padding: 10px;">${passenger.identity_number}</</td>
                          <td style="padding: 10px;">${passenger.seat_number}</td>
                        </tr>
                      `
                  }).join('')}
                </table>
              </div>
              <p>Terima kasih,<br> Tim Shinzou</p>
            </div> 
          </div>
        `
      );
    } else {
      await mailService.sendMail(user.email, "Ticket Penerbangan",
        `
          <div style=" display: block; margin-left: 15%; margin-right: 15%;">
            <div style="text-align: left; margin: 0 auto;">
              <h1 style="font-size: 20px; margin-top: 20px; text-align: center;">Your e-ticket is here!</h1>
              <div style="font-size: 14px; text-align: start">
                <h1 style="font-size: 14px;">
                  Kode Booking: <br> 
                  ${transaction.booking_code}
                </h1>
                <span>
                  Nama: ${user.name}<br>
                  Nomor Telepon: ${user.phone_number}<br>
                  Email: ${user.email}
                </span>
              </div>
                  
              <div style="margin-top: 20px; margin-buttom:0px;  color:#082f49; font-size:16px;">
                <p style="font-weight: 700">Penerbangan Pergi</p>
              </div>
              <table  style="text-align: center; width:100%; border: 5px; cellpadding: 0; cellspacing:0; margin-left: auto; margin-right: auto; border-collapse: collapse; ">      
                <tr class="font" align="center" valign="top"  style="padding: 36px 24px; font-weight:700; padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 12px; line-height: 24px; background-color: #d1cece; border-bottom: 3px solid #edebeb; text-align: start; ">
                  <td style="padding: 10px;">Pesawat</td>
                  <td style="padding: 10px;">Tipe</td>
                  <td style="padding: 10px;">Kepergian</td>
                  <td style="padding: 10px;">Kepulangan</td>
                </tr>
                <tr  style="padding:1rem; font-weight:200; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 12px; line-height: 24px;background-color: #eae8e8; text-align: start; ">
                  <td style="padding: 10px;">${transaction.departureFlight.airline.airline_name} <br> (${transaction.departureFlight.airline.airline_code})</</td>
                  <td style="padding: 10px;">${transaction.departureFlight.class}</</td>
                  <td style="padding: 10px;">
                    ${dayjs(flightDepartureDate.departure).format("DD MMMM YYYY")} ${dayjs(flightDepartureDate.departure).format("HH:mm")} <br> 
                    ${transaction.departureFlight.originAirport.airport_name} (${transaction.departureFlight.originAirport.airport_code}) 
                  </td>
                  <td style="padding: 10px;">
                    ${dayjs(flightDepartureDate.arrival).format("DD MMMM YYYY")} ${dayjs(flightDepartureDate.arrival).format("HH:mm")} <br> 
                    ${transaction.departureFlight.destinationAirport.airport_name} (${transaction.departureFlight.destinationAirport.airport_code}) 
                  </td>
                </tr>
              </table>

              <div style="margin-top: 0px;  color:#082f49; font-size:16px;">
                <p style="font-weight: 700">Passangers</p>
              </div>
              <div style="text-align: center; widht:100%;">
                <table style="text-align: center; width:100%; border: 1px ; cellpadding: 0; cellspacing:0; margin-left: auto; margin-right: auto; border-collapse: collapse; margin-top:1rem;">
                  <tr style="padding: 36px 24px; font-weight:700; padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 12px; line-height: 24px; background-color: #d1cece; border-bottom: 3px solid #edebeb; text-align: start; ">
                    <td style="padding: 10px;">No</td>
                    <td style="padding: 10px;">Nama</td>
                    <td style="padding: 10px;">No. Identitas</td>
                    <td style="padding: 10px;">Tempat Duduk</td>
                  </tr>
                  ${(passengers).map((passenger, index) => {
                    return `
                        <tr key=${index} style="padding:1rem; font-weight:200; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 12px; line-height: 24px;background-color: #eae8e8; text-align: start; ">
                          <td style="padding: 10px;">${index + 1}</</td>
                          <td style="padding: 10px;">${passenger.name}</</td>
                          <td style="padding: 10px;">${passenger.identity_number}</</td>
                          <td style="padding: 10px;">${passenger.seat_number}</td>
                        </tr>
                      `
                  }).join('')}
                </table>
              </div>
              <p>Terima kasih,<br> Tim Shinzou</p>
            </div> 
          </div>
        `
      );
    }
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
    const { id, email, name } = req.user;

    await transactionRepository.updateTransactionByBookingCode(booking_code, { 
      payment_method
    });

    // Add notification
    await notificationRepository.addNotification({
      user_id: id,
      message: `Pembayaran tiket #${booking_code} Anda telah diterima. Terima kasih telah memesan tiket di Shinzou!`,
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
            <li>Kode Booking: ${booking_code}</li>
            <li>Metode Pembayaran: ${payment_method}</li>
          </ul>
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

module.exports = {
  getTransactions,
  getTransaction,
  addTransaction,
  printTicket,
  addPayment
}