const { v4: uuidv4 } = require("uuid");
const { addHours } = require("date-fns");
const dayjs = require("dayjs");

const classes = ["Economy", "Premium Economy", "Business", "First Class"];
const prices = [500000, 550000, 600000, 650000, 700000, 750000, 800000, 850000, 900000, 950000, 1000000];
const airlines = [
  { id: 1, airline_code: "ID", airline_name: "Batik Air" },
  { id: 2, airline_code: "IU", airline_name: "Super Air Jet" },
  { id: 3, airline_code: "GA", airline_name: "Garuda Indonesia" },
  { id: 4, airline_code: "JT", airline_name: "Lion Air" },
  { id: 5, airline_code: "SJ", airline_name: "Sriwijaya Air" },
  { id: 6, airline_code: "QG", airline_name: "Citilink" },
  { id: 7, airline_code: "QZ", airline_name: "AirAsia Indonesia" }
];
const flights = [];

const generateFlightNumber = (airlineCode) => {
  const char = "0123456789"
  let flight_number = `${airlineCode}-`;

  for (let i = 0; i < 3; i++) {
    flight_number += char[(Math.floor(Math.random() * char.length))];
  }

  return flight_number;
}

const generateFlightDate = (start, end) => {
  const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  const departure = randomDate;
  const arrival = addHours(departure, Math.floor(Math.random() * 7) + 1);

  return {
    departure,
    arrival
  }
}

const generateFlights = (length) => {
  for (let i = 1; i <= length; i++) {
    for (let j = 1; j <= length; j++) {
      if (i !== j) {
        const randomAirlines = Math.floor(Math.random() * 7);
        const randomClass = Math.floor(Math.random() * classes.length);
        const randomPrice = Math.floor(Math.random() * prices.length);
        const flightNumber = generateFlightNumber(airlines[randomAirlines].airline_code);
        let departureFlight = generateFlightDate(new Date(), new Date("2023/12/31"));

        if (i > j) {
          departureFlight = generateFlightDate(departureFlight.departure, new Date("2023/12/31"));
        }
        
        const flight = {
          id: uuidv4(),
          origin_airport_id: i,
          destination_airport_id: j,
          airline_id: airlines[randomAirlines].id,
          flight_number: flightNumber,
          departure_date: dayjs(departureFlight.departure).format("YYYY-MM-DD"),
          departure_time: dayjs(departureFlight.departure).format("HH:mm:ss.sssZ"),
          arrival_date: dayjs(departureFlight.arrival).format("YYYY-MM-DD"),
          arrival_time: dayjs(departureFlight.arrival).format("HH:mm:ss.sssZ"),
          capacity: 72,
          description: "In Flight Entertainment",
          class: classes[randomClass],
          price: prices[randomPrice],
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        flights.push(flight);

        for (let k = 0; k < 4; k++) {
          flights.push({
            ...flight,
            id: uuidv4(),
            flight_number: generateFlightNumber(airlines[randomAirlines].airline_code),
            departure_time: dayjs(addHours(departureFlight.departure, Math.floor(Math.random() * 7) + 1)).format("HH:mm:ss.sssZ"),
            arrival_date: dayjs(addHours(departureFlight.arrival, Math.floor(Math.random() * 7) + 1)).format("YYYY-MM-DD"),
            arrival_time: dayjs(addHours(departureFlight.arrival, Math.floor(Math.random() * 7) + 1)).format("HH:mm:ss.sssZ"),
            price: prices[Math.floor(Math.random() * prices.length)]
          });
        }
      }
    }
  }

  return flights;
}

module.exports = {
  generateFlights
}