/* eslint-disable max-lines-per-function */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      orderId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'userId',
        },
      },
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('Orders');
  },
};
