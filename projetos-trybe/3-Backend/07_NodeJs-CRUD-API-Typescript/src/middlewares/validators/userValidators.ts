import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const usernameGap = async (req: Request, res: Response, next: NextFunction) => {
  const { username } = req.body;

  if (!username) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Username is required' });
  }
  if (typeof username !== 'string') {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({ error: 'Username must be a string' });
  }
  if (username.length <= 2) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({ error: 'Username must be longer than 2 characters' });
  }

  next();
};

const classeGap = async (req: Request, res: Response, next: NextFunction) => {
  const { classe } = req.body;

  if (!classe) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Classe is required' });
  }
  if (typeof classe !== 'string') {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ error: 'Classe must be a string' });
  }
  if (classe.length <= 2) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({ error: 'Classe must be longer than 2 characters' });
  }

  next();
};

const levelGap = async (req: Request, res: Response, next: NextFunction) => {
  const { level } = req.body;

  if (level <= 0) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({ error: 'Level must be greater than 0' });
  }
  if (!level) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Level is required' });
  }
  if (typeof level !== 'number') {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ error: 'Level must be a number' });
  }

  next();
};

const passwordGap = async (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;

  if (!password) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Password is required' });
  }
  if (typeof password !== 'string') {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({ error: 'Password must be a string' });
  }
  if (password.length < 8) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({ error: 'Password must be longer than 7 characters' });
  }

  next();
};

export default {
  usernameGap,
  classeGap,
  levelGap,
  passwordGap,
};