import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import OrderService from '../services/OrderService';
import { OrderToRegister } from '../interfaces/Order';

const findAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const allOrders = await OrderService.findAll();
    return res.status(StatusCodes.OK).json(allOrders);
  } catch (e) {
    next(e);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  const orderInfo: OrderToRegister = req.body; // userId estará presente no body, devido ao MW verifyToken.

  try {
    const newOrder = await OrderService.create(orderInfo);
    return res.status(StatusCodes.CREATED).json({ order: newOrder });
  } catch (e) {
    next(e);
  }
};

export default {
  findAll,
  create,
};