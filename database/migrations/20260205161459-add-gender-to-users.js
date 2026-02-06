'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'gender', {
      type: Sequelize.ENUM('male', 'female'),
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'gender');
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_users_gender"',
    );
  },
};
