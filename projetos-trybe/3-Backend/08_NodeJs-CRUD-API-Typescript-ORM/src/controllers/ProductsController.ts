import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ProductToRegister } from '../interfaces/Product';
import ProductsService from '../services/ProductsService';

const findAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const allProducts = await ProductsService.findAll();
    return res.status(StatusCodes.OK).json(allProducts);
  } catch (e) {
    next(e);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  const { name, amount }: ProductToRegister = req.body;

  try {
    const newProduct = await ProductsService.create({ name, amount });
    return res.status(StatusCodes.CREATED).json({ item: newProduct });
  } catch (e) {
    next(e);
  }
};

export default {
  findAll,
  create,
};
