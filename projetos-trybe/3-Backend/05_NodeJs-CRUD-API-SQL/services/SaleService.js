const { StatusCodes } = require('http-status-codes');
const SaleModel = require('../models/SaleModel');
const ProductModel = require('../models/ProductModel');

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
  const infoFromStockArr = [];
  const updatedStockArr = [];
  const saleId = await SaleModel.createSale();

  await Promise.all(newSaleArr.map(async ({ productId, quantity }) => { // Cada { productId, quantity } presente no newSaleArr, será cadastrado na tabela sales_products.
    await SaleModel.createSaleProduct(saleId, productId, quantity);
  }));

  await Promise.all(newSaleArr.map(async ({ productId }) => {
    const product = await ProductModel.findById(productId);
    infoFromStockArr.push(...product);
  }));

  infoFromStockArr.forEach(({ id, quantity }, i) => {
    updatedStockArr.push({ productId: id, quantity: quantity - newSaleArr[i].quantity });
  });

  await Promise.all(updatedStockArr.map(async ({ productId, quantity }) => { // A cada novo cadastro na tabela sales_products, a quantidade de produtos em estoque (tabela products) é reduzida.
    await ProductModel.updateQuantityOnSale(productId, quantity);
  }));

  return { id: saleId, itemsSold: newSaleArr }; // O mesmo array passado no body da requisição, será retornado.
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