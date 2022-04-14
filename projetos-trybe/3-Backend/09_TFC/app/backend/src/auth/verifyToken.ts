import * as jwt from 'jsonwebtoken';
import * as fs from 'fs/promises';
import { Request, Response, NextFunction } from 'express';
import { IGenerateToken } from '../interfaces/authInterfaces';
import StatusCodes from '../enum/StatusCodes';

const JWT_SECRET = fs.readFile('jwt.evaluation.key', 'utf-8'); // Salvar a SECRET_KEY no arquivo 'jwt.evaluation.key' foi requisito do projeto.

export default async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(authorization, await JWT_SECRET);
    const { role } = decoded as IGenerateToken;
    req.body = { role, ...req.body }; // Coloca o role do usuário validado à disposição. Necessitei no REQ 14.
    next();
  } catch (e) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid token' });
  }
};
