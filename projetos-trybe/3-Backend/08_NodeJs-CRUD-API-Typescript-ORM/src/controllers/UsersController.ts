import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UsersService from '../services/UsersService';

import { UserToRegister } from '../interfaces/User';

const create = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password, classe, level }: UserToRegister = req.body;

  try {
    const token = await UsersService.create({ username, password, classe, level });
    return res.status(StatusCodes.CREATED).json({ token });
  } catch (e) {
    next(e);
  }
};

export default {
  create,
};
