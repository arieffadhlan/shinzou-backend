"use strict";
/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Flights", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      origin_airport_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Airports",
          key: "id"
        }
      },
      destination_airport_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Airports",
          key: "id"
        }
      },
      airline_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Airlines",
          key: "id"
        }
      },
      flight_number: {
        allowNull: false,
        type: Sequelize.STRING
      },
      departure_date: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      departure_time: {
        allowNull: false,
        type: Sequelize.TIME
      },
      arrival_date: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      arrival_time: {
        allowNull: false,
        type: Sequelize.TIME
      },
      capacity: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      class: {
        allowNull: false,
        type: Sequelize.STRING
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Flights");
  }
};