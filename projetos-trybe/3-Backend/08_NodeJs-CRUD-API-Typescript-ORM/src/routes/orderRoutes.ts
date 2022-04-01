import express from 'express';
import OrdersController from '../controllers/OrdersController';

import verifyToken from '../auth/verifyToken';
import orderValidators from '../middlewares/validators/orderValidators';

const orderRoutes = express.Router();

orderRoutes.get(
  '/',
  OrdersController.findAll,
);

orderRoutes.post(
  '/',
  verifyToken,
  orderValidators.productsGap,
  OrdersController.create,
);

export default orderRoutes;
