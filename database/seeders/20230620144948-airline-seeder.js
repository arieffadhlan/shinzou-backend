"use strict";
/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Airlines", [
      {
        airline_code: "ID",
        airline_name: "Batik Air",
        airline_image: "https://seeklogo.com/images/B/batik-air-logo-EDCC357AB3-seeklogo.com.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },    
      {
        airline_code: "IU",
        airline_name: "Super Air Jet",
        airline_image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Logo_Super_Air_Jet.svg/2560px-Logo_Super_Air_Jet.svg.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },   
      {
        airline_code: "GA",
        airline_name: "Garuda Indonesia",
        airline_image: "https://www.pngfind.com/pngs/m/520-5201985_garuda-indonesia-logo-garuda-indonesia-logo-png-transparent.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airline_code: "JT",
        airline_name: "Lion Air",
        airline_image: "https://download.logo.wine/logo/Lion_Air/Lion_Air-Logo.wine.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },    
      {
        airline_code: "SJ",
        airline_name: "Sriwijaya Air",
        airline_image: "https://w7.pngwing.com/pngs/446/646/png-transparent-flight-sriwijaya-air-kuala-namu-international-airport-srivijaya-airline-ticket-business-text-people-logo-thumbnail.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },    
      {
        airline_code: "QG",
        airline_name: "Citilink",
        airline_image: "https://w7.pngwing.com/pngs/966/510/png-transparent-garuda-indonesia-citilink-airline-logo-business-text-people-indonesia.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },   
      {
        airline_code: "QZ",
        airline_name: "AirAsia Indonesia",
        airline_image: "https://w7.pngwing.com/pngs/17/215/png-transparent-kuala-lumpur-direct-flight-airasia-airplane-muslim-company-text-logo.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },      
    ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Airlines", null, { 
      truncate: true, 
      cascade: true ,
      restartIdentity: true
    });
  }
};