"use strict";

const generateRandomNumber = () => {
  return Math.floor(Math.random() * 7) + 1
}

/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Flights", [
      {
        origin_airport_id: generateRandomNumber(),
        destination_airport_id: generateRandomNumber(),
        airline_id: generateRandomNumber(),
        departure_datetime: new Date(),
        arrival_datetime: new Date(),
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
