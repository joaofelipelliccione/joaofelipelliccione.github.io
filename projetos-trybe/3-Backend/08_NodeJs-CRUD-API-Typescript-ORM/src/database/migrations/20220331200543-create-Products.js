/* eslint-disable max-lines-per-function */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      productId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      amount: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      orderId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'Orders',
          key: 'orderId',
        },
      },
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('Products');
  },
};
