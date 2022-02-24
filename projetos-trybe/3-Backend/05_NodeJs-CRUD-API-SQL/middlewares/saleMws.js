/* eslint-disable max-lines-per-function */

const { StatusCodes } = require('http-status-codes');
const ProductModel = require('../models/ProductModel');

const idValidator = (req, res, next) => {
  let invalidId = false;
  const newSaleArr = req.body;

  newSaleArr.forEach(({ productId }) => {
    if (!productId) {
      invalidId = true;
      return invalidId;
    }
  });

  if (invalidId) {
    return res.status(StatusCodes.BAD_REQUEST)
    .json({ message: '"productId" is required' }); 
  }

  next();
};

const notInformedQuantityValidator = (req, res, next) => {
  let quantityNotInformed = false;
  const newSaleArr = req.body;

  newSaleArr.forEach(({ quantity }) => {
    if (!quantity || !Number.isInteger(quantity)) {
      quantityNotInformed = true;
      return quantityNotInformed;
    }
  });

  if (quantityNotInformed) {
    return res.status(StatusCodes.BAD_REQUEST)
    .json({ message: '"quantity" is required' }); 
  }
  next();
};

const quantityLowerThanOneValidator = (req, res, next) => {
  let quantityLowerThanOne = false;
  const newSaleArr = req.body;

  newSaleArr.forEach(({ quantity }) => {
    if (quantity <= 0) {
      quantityLowerThanOne = true;
      return quantityLowerThanOne;
    }
  });

  if (quantityLowerThanOne) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY)
    .json({ message: '"quantity" must be greater than or equal to 1' });
  }
  next();
};

const outOfStockProductsValidator = async (req, res, next) => {
  let outOfStock = false;
  const productsStockArr = [];
  const newSaleArr = req.body;

  await Promise.all(newSaleArr.map(async (newSaleObj) => {
    const itemsFromStock = await ProductModel.findById(newSaleObj.productId);
    productsStockArr.push(...itemsFromStock);
  }));

  newSaleArr.forEach((newSaleObj) => {
    productsStockArr.forEach(({ quantity }) => {
      if (quantity < newSaleObj.quantity) {
        outOfStock = true;
        return outOfStock;
      }
    });
  });

  if (outOfStock) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY)
    .json({ message: 'Such amount is not permitted to sell' });
  }
  next();
};

module.exports = {
  idValidator,
  notInformedQuantityValidator,
  quantityLowerThanOneValidator,
  outOfStockProductsValidator,
};