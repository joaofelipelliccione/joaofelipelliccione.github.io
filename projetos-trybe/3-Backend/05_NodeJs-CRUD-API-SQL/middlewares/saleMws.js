const { StatusCodes } = require('http-status-codes');
// const ProductModel = require('../models/ProductModel');

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

// const outOfStockProductsValidator = (req, res, next) => {
//   let outOfStock = false;
//   const newSaleArr = req.body;
//   console.log(newSaleArr)

//   newSaleArr.forEach(async (newSaleObj) => {
//     const product = await ProductModel.findById(newSaleObj.productId);
//     console.log(product[0].quantity, newSaleObj.quantity);
//     if (product[0].quantity < newSaleObj.quantity) {
//       outOfStock = true;
//       return outOfStock;
//     }
//   });

//   console.log(outOfStock);
//   next();
// };

module.exports = {
  idValidator,
  notInformedQuantityValidator,
  quantityLowerThanOneValidator,
  // outOfStockProductsValidator,
};