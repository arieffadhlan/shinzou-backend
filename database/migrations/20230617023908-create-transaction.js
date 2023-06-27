"use strict";
/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Transactions", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      departure_flight_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: "Flights",
          key: "id"
        }
      },
      return_flight_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: "Flights",
          key: "id"
        }
      },
      user_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: "Users",
          key: "id"
        }
      },
      booking_code: {
        allowNull: false,
        type: Sequelize.CHAR(9)
      },
      ammount: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      payment_method: {
        allowNull: true,
        type: Sequelize.STRING
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
    await queryInterface.dropTable("Transactions");
  }
};