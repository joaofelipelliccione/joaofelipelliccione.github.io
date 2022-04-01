import ProductsModel from '../database/models/Products';

import { Product, ProductToRegister } from '../interfaces/Product';

const findAll = async (): Promise<Product[]> => {
  const allProducts = await ProductsModel.findAll();

  return allProducts;
};

const create = async ({ name, amount }: ProductToRegister): Promise<Product> => {
  const newProduct = await ProductsModel.create({ name, amount });
  return newProduct;
};

export default {
  findAll,
  create,
};
