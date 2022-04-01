import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const connection = new Sequelize(
  String(process.env.MYSQL_DATABASE),
  String(process.env.MYSQL_USER),
  process.env.MYSQL_PASSWORD,
  {
    dialect: 'mysql',
    host: process.env.MYSQL_HOST,
    logging: false,
  },
);

export default connection;
