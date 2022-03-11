const { StatusCodes } = require('http-status-codes');
const CategoryService = require('../services/CategoryService');

const create = async (req, res, _next) => {
  const { name } = req.body;
  const existentCategory = await CategoryService.findCategory(name);

  if (!existentCategory.error) {
    return res.status(StatusCodes.CONFLICT).json({ message: 'Category already registered' });
  }

  const newCategory = await CategoryService.create({ name });
  return res.status(StatusCodes.CREATED).json(newCategory);
};

const findAll = async (_req, res, _next) => {
  const categories = await CategoryService.findAll();
  return res.status(StatusCodes.OK).json(categories);
};

module.exports = {
  create,
  findAll,
};