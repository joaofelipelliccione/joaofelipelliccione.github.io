import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import LoginService from '../services/LoginService';

import { UserInfoToLogin } from '../interfaces/Login';

const login = async (req: Request, res: Response, next: NextFunction) => {
  const userInfo: UserInfoToLogin = req.body;

  try {
    const token = await LoginService.findOne(userInfo);

    if (token === null) {
      return res.status(StatusCodes.UNAUTHORIZED)
        .json({ error: 'Username or password invalid' });
    }

    return res.status(StatusCodes.OK).json({ token });
  } catch (e) {
    next(e);
  }
};

export default {
  login,
};