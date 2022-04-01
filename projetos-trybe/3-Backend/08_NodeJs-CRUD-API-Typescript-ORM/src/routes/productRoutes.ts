import express from 'express';
import ProductsController from '../controllers/ProductsController';

// import verifyToken from '../auth/verifyToken';
import productValidators from '../middlewares/validators/productValidators';

const productRoutes = express.Router();

productRoutes.get(
  '/',
  ProductsController.findAll,
);

productRoutes.post(
  '/',
  // verifyToken,
  productValidators.nameGap,
  productValidators.amountGap,
  ProductsController.create,
);

export default productRoutes;
