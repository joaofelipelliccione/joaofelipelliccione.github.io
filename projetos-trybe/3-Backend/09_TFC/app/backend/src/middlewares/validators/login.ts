import { NextFunction, Request, Response } from 'express';
import StatusCodes from '../../enum/StatusCodes';
import { IUser } from '../../interfaces/loginInterfaces';

const loginGapsValidation = (req: Request, res: Response, next: NextFunction) => {
  const { email, password }: IUser = req.body;

  const regexValidEmail = /\S+@\S+\.\S+/; // string@string.string(.string)
  const isEmailValid = regexValidEmail.test(email);

  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'All fields must be filled' });
  }

  if (!isEmailValid || password.length < 6) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Incorrect email or password' });
  }

  next();
};

export default loginGapsValidation;
