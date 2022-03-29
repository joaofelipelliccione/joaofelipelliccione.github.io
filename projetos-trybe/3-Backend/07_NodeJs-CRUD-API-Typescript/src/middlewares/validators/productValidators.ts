import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const nameGap = async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;

  if (!name) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Name is required' });
  }
  if (typeof name !== 'string') {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ error: 'Name must be a string' });
  }
  if (name.length <= 2) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({ error: 'Name must be longer than 2 characters' });
  }

  next();
};

const amountGap = async (req: Request, res: Response, next: NextFunction) => {
  const { amount } = req.body;

  if (!amount) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Amount is required' });
  }
  if (typeof amount !== 'string') {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ error: 'Amount must be a string' });
  }
  if (amount.length <= 2) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({ error: 'Amount must be longer than 2 characters' });
  }

  next();
};

export default {
  nameGap,
  amountGap,
};