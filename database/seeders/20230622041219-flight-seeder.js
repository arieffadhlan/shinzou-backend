"use strict";
/** @type {import("sequelize-cli").Migration} */
const { generateFlights } = require("../../utils/generateFlights");
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Flights", 
      generateFlights(7), 
    {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Flights", null, { 
      truncate: true, 
      cascade: true ,
      restartIdentity: true
    });
  }
};