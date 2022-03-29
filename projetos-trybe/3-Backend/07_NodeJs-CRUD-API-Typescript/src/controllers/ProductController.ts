import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ProductToRegister } from '../interfaces/Product';
import ProductService from '../services/ProductService';

const findAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const allProducts = await ProductService.findAll();
    return res.status(StatusCodes.OK).json(allProducts);
  } catch (e) {
    next(e);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  const productInfo: ProductToRegister = req.body;

  try {
    const newProduct = await ProductService.create(productInfo);
    return res.status(StatusCodes.CREATED).json({ item: newProduct });
  } catch (e) {
    next(e);
  }
};

export default {
  findAll,
  create,
};