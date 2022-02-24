const { StatusCodes } = require('http-status-codes');
const SaleModel = require('../models/SaleModel');

const findAll = async () => {
  const sales = await SaleModel.findAll();
  return sales;
};

const findById = async (saleId) => {
  const sale = await SaleModel.findById(saleId);

  if (sale.length === 0) {
    return {
      error: { code: StatusCodes.NOT_FOUND, message: 'Sale not found' },
    };
  }

  return sale;
};

const create = async (newSaleArr) => {
  const saleId = await SaleModel.createSale();

  await Promise.all(newSaleArr.map(async ({ productId, quantity }) => { // Cada { productId, quantity } presente no newSaleArr, será cadastrado na tabela sales_products;
    const createSaleProduct = await SaleModel.createSaleProduct(saleId, productId, quantity);
    return createSaleProduct;
  }));

  return {
    id: saleId,
    itemsSold: newSaleArr, // O mesmo array passado no body da requisição, será retornado.
  };
};

const update = async (saleId, saleUpdatedInfoArr) => {
  await Promise.all(saleUpdatedInfoArr.map(async ({ productId, quantity }) => {
    const updatedSale = await SaleModel.update(saleId, productId, quantity);
    return updatedSale;
  }));

  return {
    saleId,
    itemUpdated: saleUpdatedInfoArr,
  };
};

const remove = async (saleId) => {
  const sale = await SaleModel.findById(saleId);
  if (sale.length === 0) {
    return {
      error: { code: StatusCodes.NOT_FOUND, message: 'Sale not found' },
    };
  }

  await SaleModel.remove(saleId);
  return { code: StatusCodes.NO_CONTENT };
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};