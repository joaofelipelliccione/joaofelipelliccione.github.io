import ProductModel from '../models/ProductModel';
import connection from '../models/connection';

import { Product, ProductToRegister } from '../interfaces/Product';

const findAll = async (): Promise<Product[]> => {
  const productModel = new ProductModel(connection); // Instanciando um objeto a partir da classe ProductModel.
  const allProducts = await productModel.findAll();

  return allProducts;
};

const create = async (productInfo: ProductToRegister): Promise<Product> => {
  const productModel = new ProductModel(connection);
  const newProduct = await productModel.create(productInfo);

  return newProduct;
};

export default {
  findAll,
  create,
};