'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tickets', {
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
      passenger_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: "Passengers",
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
    await queryInterface.dropTable('Tickets');
  }
};