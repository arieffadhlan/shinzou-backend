"use strict";
/** @type {import("sequelize-cli").Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Passangers", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      transaction_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: "Transactions",
          key: "id"
        }
      },
      seat_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Seats",
          key: "id"
        }
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      family_name: {
        allowNull: true,
        type: Sequelize.STRING
      },
      phone_number: {
        allowNull: false,
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
    await queryInterface.dropTable("Passangers");
  }
};