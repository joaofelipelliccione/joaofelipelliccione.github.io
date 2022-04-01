/* eslint-disable max-lines-per-function */

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          // userId: 1,
          username: 'João Felipe',
          password: 'Joao1234',
          classe: 'Atletas',
          level: 5,
        },
        {
          // userId: 2,
          username: 'Luiza Sayão',
          password: 'Luiza1234',
          classe: 'Gênios',
          level: 4,
        },
        {
          // userId: 3,
          username: 'André Roberto',
          password: 'André1234',
          classe: 'Batalhadores',
          level: 3,
        },
      ],

      { timestamps: false },
    );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
