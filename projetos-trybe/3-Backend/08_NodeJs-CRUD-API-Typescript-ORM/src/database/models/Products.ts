import { DataTypes, Model } from 'sequelize';
import connection from '../connection';
import OrdersModel from './Orders';

class ProductsModel extends Model {
  declare productId: number;
  declare name: string;
  declare amount: string;
  declare orderId: string;
}

ProductsModel.init(
  {
    productId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    amount: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Orders',
        key: 'orderId',
      },
    },
  },
  {
    sequelize: connection,
    tableName: 'Products',
    timestamps: false,
  },
);

ProductsModel.belongsTo(OrdersModel, { foreignKey: 'orderId', as: 'orders' });
OrdersModel.hasMany(ProductsModel, { foreignKey: 'orderId', as: 'products' });

export default ProductsModel;
