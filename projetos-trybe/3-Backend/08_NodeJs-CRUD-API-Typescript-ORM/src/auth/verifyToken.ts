import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import dotenv from 'dotenv';
import InfoToCreateToken from '../interfaces/Token';

dotenv.config();

export default async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(authorization, String(process.env.JWT_SECRET));
    const { userId } = decoded as InfoToCreateToken; // Dizendo para o compilador considerar que o objeto decoded tem seu tipo definido pela interface InfoToCreateToken.
    req.body = { userId, ...req.body }; // Coloca o userId do usuário validado à disposição. Necessitei no REQ 5.

    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid token' });
  }
};
