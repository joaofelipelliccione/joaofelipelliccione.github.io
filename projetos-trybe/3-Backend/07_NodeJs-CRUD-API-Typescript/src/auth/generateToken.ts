import jwt from 'jsonwebtoken';
import InfoToCreateToken from '../interfaces/Token';

const SECRET = 'Tell_Nobody'; // Deverá ser realocado para o arquivo .env

export default async (userInfo: InfoToCreateToken): Promise<string> => {
  const token = jwt.sign(userInfo, SECRET, {
    algorithm: 'HS256',
    expiresIn: '5d',
  });

  return token;
};