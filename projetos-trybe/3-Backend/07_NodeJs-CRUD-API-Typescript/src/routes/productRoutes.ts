import express from 'express';
import ProductController from '../controllers/ProductController';

// import verifyToken from '../auth/verifyToken';
import productValidators from '../middlewares/validators/productValidators';

const productRoutes = express.Router();

productRoutes.get(
  '/',
  ProductController.findAll,
);

productRoutes.post(
  '/',
  // verifyToken,
  productValidators.nameGap,
  productValidators.amountGap,
  ProductController.create,
);

export default productRoutes;