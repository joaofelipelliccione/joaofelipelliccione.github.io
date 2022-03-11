const { StatusCodes } = require('http-status-codes');
const { Category } = require('../../models');

const findCategory = async (name) => {
  const category = await Category.findOne({
    where: { name },
  });

  if (category === null) {
    return {
      error: {
        code: StatusCodes.NOT_FOUND,
        message: 'Category not found',
      },
    };
  }

  return category;
};

const findByPk = async (id) => {
  const category = await Category.findByPk(id);

  if (category === null) {
    return {
      error: {
        code: StatusCodes.NOT_FOUND,
        message: 'Category not found',
      },
    };
  }

  return category;
};

const create = async ({ name }) => {
  const newCategory = await Category.create({ name });

  return {
    id: newCategory.id,
    name,
  };
};

const findAll = async () => {
  const categories = await Category.findAll();
  return categories;
};

module.exports = {
  findCategory,
  findByPk,
  create,
  findAll,
};