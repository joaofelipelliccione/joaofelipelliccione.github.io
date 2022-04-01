/* eslint-disable max-lines-per-function */

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert(
      'Products',
      [
        {
          // productId: 1,
          name: 'Espada',
          amount: '20 peças de ouro',
          orderId: null,
        },
        {
          // productId: 2,
          name: 'Escudo',
          amount: '60 peças de prata',
          orderId: null,
        },
        {
          // productId: 3,
          name: 'Armadura',
          amount: '100 peças de titânio',
          orderId: 1,
        },
        {
          // productId: 3,
          name: 'Capacete',
          amount: '5 peças de cobre',
          orderId: null,
        },
        {
          // productId: 4,
          name: 'Outra Coisa',
          amount: 'X peças de Y',
          orderId: null,
        },
      ],

      { timestamps: false },
    );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {});
  },
};
