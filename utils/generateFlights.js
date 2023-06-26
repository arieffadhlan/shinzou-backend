const { v4: uuidv4 } = require("uuid");
const { addHours } = require("date-fns");
const dayjs = require("dayjs");

function generateFlightDate(start, end) {
  const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  const departure = randomDate;
  const arrival = addHours(departure, Math.floor(Math.random() * 7) + 1);

  return {
    departure,
    arrival
  }
}

const classes = ["Economy", "Premium Economy", "Business", "First Class"];
const prices = [500000, 550000, 600000, 650000, 700000, 750000, 800000, 850000, 900000, 950000, 1000000];
const flights = [];

const generateFlights = (length) => {
  for (let i = 1; i <= length; i++) {
    for (let j = 1; j <= length; j++) {
      if (i !== j) {
        const randomAirplane = Math.floor(Math.random() * 7) + 1; 
        const randomClass = Math.floor(Math.random() * classes.length);
        const randomPrice = Math.floor(Math.random() * prices.length);
        const randomDate = generateFlightDate(new Date(), new Date("2023/12/31"));
        
        const flight = {
          id: uuidv4(),
          origin_airport_id: i,
          destination_airport_id: j,
          airline_id: randomAirplane,
          departure_date: dayjs(randomDate.departure).format("YYYY-MM-DD"),
          departure_datetime: randomDate.departure,
          arrival_date: dayjs(randomDate.departure).format("YYYY-MM-DD"),
          arrival_datetime: randomDate.arrival,
          capacity: 72,
          description: "In Flight Entertainment",
          class: classes[randomClass],
          price: prices[randomPrice],
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        flights.push(flight);
      }
    }
  }

  return flights;
}

module.exports = {
  generateFlights
}