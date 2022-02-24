const { StatusCodes } = require('http-status-codes');

const nameValidator = (req, res, next) => {
  const { name } = req.body;

  if (!name) return res.status(StatusCodes.BAD_REQUEST).json({ message: '"name" is required' });
  if (name.length < 5) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY)
    .json({ message: '"name" length must be at least 5 characters long' });
  }

  next();
};

const quantityValidator = (req, res, next) => {
  const { quantity } = req.body;

  if (!quantity && quantity !== 0) {
  return res.status(StatusCodes.BAD_REQUEST)
  .json({ message: '"quantity" is required' }); 
  }
  if (quantity <= 0 || !Number.isInteger(quantity)) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY)
    .json({ message: '"quantity" must be greater than or equal to 1' });
  }

  next();
};

module.exports = {
  nameValidator,
  quantityValidator,
};