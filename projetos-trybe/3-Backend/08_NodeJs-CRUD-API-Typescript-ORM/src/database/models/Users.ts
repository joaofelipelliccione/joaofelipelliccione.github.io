import { DataTypes, Model } from 'sequelize';
import connection from '../connection';

class UsersModel extends Model {
  declare userId: number;
  declare username: string;
  declare password: string;
  declare classe: string;
  declare level: number;
}

UsersModel.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    classe: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: connection,
    tableName: 'Users',
    timestamps: false,
  },
);

export default UsersModel;
