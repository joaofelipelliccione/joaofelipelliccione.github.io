import { Request, Response, NextFunction } from 'express';
import StatusCodes from '../enum/StatusCodes';
import LoginService from '../services/LoginService';

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await LoginService.login({ email, password });

    if (user === null) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'Incorrect email or password' });
    }
    return res.status(StatusCodes.OK).json(user);
  } catch (e) {
    next(e);
  }
};

const validateGeneratedToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { role } = req.body;
    return res.status(StatusCodes.OK).json(role);
  } catch (e) {
    next(e);
  }
};

export default {
  login,
  validateGeneratedToken,
};
