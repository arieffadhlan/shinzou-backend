"use strict";
/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Airports", [
      {
        airport_code: "BTJ",
        airport_name: "Sultan Iskandar Muda International",
        location: "Banda Aceh",
        location_acronym: "BNA",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airport_code: "KNO",
        airport_name: "Kualanamu International",
        location: "Medan",
        location_acronym: "MDN",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airport_code: "PLM",
        airport_name: "Sultan Mahmud Badaruddin II",
        location: "Palembang",
        location_acronym: "PLG",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airport_code: "CGK",
        airport_name: "Soekarno-Hatta International",
        location: "Jakarta",
        location_acronym: "JKT",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airport_code: "BDO",
        airport_name: "Husein Sastranegara International",
        location: "Bandung",
        location_acronym: "BDG",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airport_code: "SUB",
        airport_name: "Juanda International",
        location: "Surabaya",
        location_acronym: "SBY",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airport_code: "DPS",
        airport_name: "I Gusti Ngurah Rai International",
        location: "Denpasar",
        location_acronym: "DPR",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Airports", null, { 
      truncate: true, 
      cascade: true ,
      restartIdentity: true
    });
  }
};