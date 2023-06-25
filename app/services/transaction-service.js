const passengerRepository = require("../repositories/passenger-repository");
const seatRepository = require("../repositories/seat-repository");
const transactionRepository = require("../repositories/transaction-repository");
const ApplicationError = require("../errors/ApplicationError");

const generateBookingCode = () => {
  const char = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
  let bookingCode = "";
  for (let i = 0; i < 9; i++) {
    bookingCode += char[(Math.floor(Math.random() * char.length))];
  }
  return bookingCode;
}

const addTransaction = async (req) => {
  try {
    const { flight_id, passengers, ammount } = req.body;
    const { id } = req.user;
    const booking_code = generateBookingCode();

    let transaction;
    passengers.map(async (passengerData) => {
      const passenger = await passengerRepository.addPassenger({
        title: passengerData.title,
        name: passengerData.name,
        family_name: passengerData.family_name ? passengerData.family_name : null,
        phone_number: passengerData.phone_number
      });
  
      await seatRepository.addSeat({
        flight_id,
        passenger_id: passenger.id,
        seat_number: passengerData.seat_number
      });

      transaction = await transactionRepository.addTransaction({
        user_id: id,
        flight_id,
        passenger_id: passenger.id,
        booking_code,
        ammount
      });
    });
    
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
  addTransaction,
}