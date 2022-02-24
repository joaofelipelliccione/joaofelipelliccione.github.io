const { StatusCodes } = require('http-status-codes');
const ProductModel = require('../models/ProductModel');

const findAll = async () => {
  const products = await ProductModel.findAll();
  return products;
};

const findById = async (productId) => {
  const product = await ProductModel.findById(productId);

  if (product.length === 0) {
    return {
      error: { code: StatusCodes.NOT_FOUND, message: 'Product not found' },
    };
  }

  return product[0];
};

const create = async ({ name, quantity }) => {
  const productAlreadyRegistered = await ProductModel.findByName(name);
  if (productAlreadyRegistered.length !== 0) {
    return {
      error: { code: StatusCodes.CONFLICT, message: 'Product already exists' },
    };
  }
  
  const newProduct = await ProductModel.create({ name, quantity });
  return newProduct;
};

const update = async (productId, { name, quantity }) => {
  const product = await ProductModel.findById(productId);
  if (product.length === 0) {
    return {
      error: { code: StatusCodes.NOT_FOUND, message: 'Product not found' },
    };
  }

  const updatedProduct = await ProductModel.update(productId, { name, quantity });
  return updatedProduct;
};

const remove = async (productId) => {
  const product = await ProductModel.findById(productId);
  if (product.length === 0) {
    return {
      error: { code: StatusCodes.NOT_FOUND, message: 'Product not found' },
    };
  }

  await ProductModel.remove(productId);
  return { code: StatusCodes.NO_CONTENT };
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};