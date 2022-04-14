import * as jwt from 'jsonwebtoken';
import * as fs from 'fs/promises';
import { IGenerateToken } from '../interfaces/authInterfaces';

const JWT_SECRET = fs.readFile('jwt.evaluation.key', 'utf-8'); // Salvar a SECRET_KEY no arquivo 'jwt.evaluation.key' foi requisito do projeto.

export default async ({ email, username, role }: IGenerateToken): Promise<string> => {
  const token = jwt.sign({ email, username, role }, await JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: '5d',
  });

  return token;
};
