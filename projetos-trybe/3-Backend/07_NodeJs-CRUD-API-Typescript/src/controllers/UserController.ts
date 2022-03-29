import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserService from '../services/UserService';

import { UserToRegister } from '../interfaces/User';

const create = async (req: Request, res: Response, next: NextFunction) => {
  const userInfo: UserToRegister = req.body;

  try {
    const token = await UserService.create(userInfo);
    return res.status(StatusCodes.CREATED).json({ token });
  } catch (e) {
    next(e);
  }
};

export default {
  create,
};