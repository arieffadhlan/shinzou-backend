'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert(
      'Tickets', 
    [
      {
        id: 1,
        airplane_name: "Lion Air",
        class_id: 2,
        location_from:  "Medan",
        location_to: "Surabaya",
        price: 2000000,
        departure_time: "2022-10-05T14:48:00.000Z",
        arrival_time: "2022-10-05T17:48:00.000Z",
        airplane_image: "vcOn!4V38UIVWh",
        status: "direct",
        passengers: 2,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: 2,
        airplane_name: "Sriwijaya air",
        class_id: 1,
        location_from: "Makassar",
        location_to: "Jakarta",
        price: 3500000,
        departure_time: "2022-11-05T08:48:00.000Z",
        arrival_time: "2022-11-05T11:24:00.000Z",
        airplane_image: "C0RmCCvXR8lf16",
        status: "transit",
        passengers: 3,
        createdAt: new Date(),
        updatedAt: new Date()
    }
  ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Tickets', null, {});
  }
};
