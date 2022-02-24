const { StatusCodes } = require('http-status-codes');
const ProductService = require('../services/ProductService');

const findAll = async (_req, res) => {
  const products = await ProductService.findAll();
  res.status(StatusCodes.OK).json(products);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const product = await ProductService.findById(id);

  if (product.error) {
    return res.status(product.error.code).json({ message: product.error.message });
  }

  res.status(StatusCodes.OK).json(product);
};

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await ProductService.create({ name, quantity });

  if (newProduct.error) {
    return res.status(newProduct.error.code)
    .json({ message: newProduct.error.message });
  } 
  
  res.status(StatusCodes.CREATED).json(newProduct);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const updatedProduct = await ProductService.update(id, { name, quantity });

  if (updatedProduct.error) {
    return res.status(updatedProduct.error.code)
    .json({ message: updatedProduct.error.message });
  } 

  res.status(StatusCodes.OK).json(updatedProduct);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const removedProduct = await ProductService.remove(id);

  if (removedProduct.error) {
    return res.status(removedProduct.error.code)
    .json({ message: removedProduct.error.message });
  } 

  res.status(removedProduct.code).json();
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
