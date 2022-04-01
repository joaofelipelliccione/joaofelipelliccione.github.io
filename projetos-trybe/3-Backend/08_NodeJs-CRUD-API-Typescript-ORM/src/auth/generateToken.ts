import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import InfoToCreateToken from '../interfaces/Token';

dotenv.config();

export default async ({ userId, username }: InfoToCreateToken): Promise<string> => {
  const token = jwt.sign({ userId, username }, String(process.env.JWT_SECRET), {
    algorithm: 'HS256',
    expiresIn: '5d',
  });

  return token;
};
