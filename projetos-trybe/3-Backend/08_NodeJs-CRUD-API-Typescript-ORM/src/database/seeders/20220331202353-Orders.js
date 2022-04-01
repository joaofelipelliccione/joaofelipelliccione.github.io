/* eslint-disable max-lines-per-function */

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert(
      'Orders',
      [
        {
          // orderId: 1,
          userId: 2,
        },
      ],

      { timestamps: false },
    );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Orders', null, {});
  },
};
