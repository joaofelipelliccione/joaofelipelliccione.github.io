import express from 'express';
import OrderController from '../controllers/OrderController';

import verifyToken from '../auth/verifyToken';
import orderValidators from '../middlewares/validators/orderValidators';

const orderRoutes = express.Router();

orderRoutes.get(
  '/',
  OrderController.findAll,
);

orderRoutes.post(
  '/',
  verifyToken,
  orderValidators.productsGap,
  OrderController.create,
);

export default orderRoutes;