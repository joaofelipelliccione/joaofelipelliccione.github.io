import { DataTypes, Model } from 'sequelize';
import connection from '../connection';
import UsersModel from './Users';

class OrdersModel extends Model {
  declare orderId: number;
  declare userId: string;
}

OrdersModel.init(
  {
    orderId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.TEXT,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'userId',
      },
    },
  },
  {
    sequelize: connection,
    tableName: 'Orders',
    timestamps: false,
  },
);

OrdersModel.belongsTo(UsersModel, { foreignKey: 'userId', as: 'user' });
UsersModel.hasMany(OrdersModel, { foreignKey: 'userId', as: 'orders' });

export default OrdersModel;
