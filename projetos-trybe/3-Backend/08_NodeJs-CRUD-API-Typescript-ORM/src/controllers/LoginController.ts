import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import LoginService from '../services/LoginService';

import { UserInfoToLogin } from '../interfaces/Login';

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password }: UserInfoToLogin = req.body;

  try {
    const token = await LoginService.login({ username, password });

    if (token === null) {
      return res.status(StatusCodes.UNAUTHORIZED)
        .json({ error: 'Could not find user with those credentials.' });
    }

    return res.status(StatusCodes.OK).json({ token });
  } catch (e) {
    next(e);
  }
};

export default {
  login,
};
