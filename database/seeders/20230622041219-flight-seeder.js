"use strict";
/** @type {import("sequelize-cli").Migration} */
const { v4: uuidv4 } = require("uuid");
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Flights", [
      {
        id: uuidv4(),
        origin_airport_id: 1,
        destination_airport_id: 2,
        airline_id: 1,
        departure_datetime: new Date("2023/06/28 07:00:00"),
        arrival_datetime: new Date("2023/06/28 11:00:00"),
        capacity: 72,
        description: "In Flight Entertainment",
        class: "Economy",
        price: 500000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        origin_airport_id: 1,
        destination_airport_id: 2,
        airline_id: 1,
        departure_datetime: new Date("2023/06/28 08:00:00"),
        arrival_datetime: new Date("2023/06/28 12:00:00"),
        capacity: 72,
        description: "In Flight Entertainment",
        class: "Premium Economy",
        price: 600000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        origin_airport_id: 1,
        destination_airport_id: 2,
        airline_id: 1,
        departure_datetime: new Date("2023/06/28 13:30:00"),
        arrival_datetime: new Date("2023/06/28 17:00:00"),
        capacity: 72,
        description: "In Flight Entertainment",
        class: "Business",
        price: 700000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        origin_airport_id: 1,
        destination_airport_id: 2,
        airline_id: 1,
        departure_datetime: new Date("2023/06/28 20:15:00"),
        arrival_datetime: new Date("2023/06/28 23:30:00"),
        capacity: 72,
        description: "In Flight Entertainment",
        class: "First Class",
        price: 800000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        origin_airport_id: 2,
        destination_airport_id: 1,
        airline_id: 2,
        departure_datetime: new Date("2023/06/30 07:00:00"),
        arrival_datetime: new Date("2023/06/30 11:00:00"),
        capacity: 72,
        description: "In Flight Entertainment",
        class: "Economy",
        price: 500000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        origin_airport_id: 2,
        destination_airport_id: 1,
        airline_id: 2,
        departure_datetime: new Date("2023/06/30 08:00:00"),
        arrival_datetime: new Date("2023/06/30 12:00:00"),
        capacity: 72,
        description: "In Flight Entertainment",
        class: "Premium Economy",
        price: 600000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        origin_airport_id: 2,
        destination_airport_id: 1,
        airline_id: 2,
        departure_datetime: new Date("2023/06/30 13:30:00"),
        arrival_datetime: new Date("2023/06/30 17:00:00"),
        capacity: 72,
        description: "In Flight Entertainment",
        class: "Business",
        price: 700000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        origin_airport_id: 2,
        destination_airport_id: 1,
        airline_id: 2,
        departure_datetime: new Date("2023/06/30 20:15:00"),
        arrival_datetime: new Date("2023/06/30 23:30:00"),
        capacity: 72,
        description: "In Flight Entertainment",
        class: "First Class",
        price: 800000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Flights", null, { 
      truncate: true, 
      cascade: true ,
      restartIdentity: true
    });
  }
};