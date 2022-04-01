import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const productsGap = async (req: Request, res: Response, next: NextFunction) => {
  const { products } = req.body;

  if (!products) {
    return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Products is required' });
  }
  if (!Array.isArray(products)) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({ error: 'Products must be an array of numbers' });
  }
  if (products.length === 0) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({ error: 'Products can\'t be empty' });
  }

  next();
};

export default {
  productsGap,
};
