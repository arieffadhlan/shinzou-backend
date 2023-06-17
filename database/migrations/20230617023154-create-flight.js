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
      class_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Classes",
          key: "id"
        }
      },
      departure_datetime: {
        allowNull: false,
        type: Sequelize.DATE
      },
      arrival_datetime: {
        allowNull: false,
        type: Sequelize.DATE
      },
      capacity: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
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