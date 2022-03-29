import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import InfoToCreateToken from '../interfaces/Token';

const SECRET = 'Tell_Nobody'; // Deverá ser realocado para o arquivo .env

export default async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(authorization, SECRET);
    const { id } = decoded as InfoToCreateToken; // Dizendo para o compilador considerar que o objeto decoded tem seu tipo definido pela interface InfoToCreateToken.
    req.body = { userId: id, ...req.body }; // Coloca o id do usuário validado à disposição. Necessitei no REQ 6.

    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid token' });
  }
};