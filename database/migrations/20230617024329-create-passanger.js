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
<<<<<<< HEAD
        type: Sequelize.STRING
=======
        type: Sequelize.ENUM(["Mr", "Miss"])
>>>>>>> 25a89db04fed65b9a6832207b98bcf9edb36e638
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