const rescue = require('express-rescue');
const { StatusCodes } = require('http-status-codes');
const SaleService = require('../services/SaleService');

const findAll = rescue(async (_req, res) => {
  const sales = await SaleService.findAll();
  res.status(StatusCodes.OK).json(sales);
});

const findById = rescue(async (req, res) => {
  const { id } = req.params;
  const sale = await SaleService.findById(id);

  if (sale.error) {
    return res.status(sale.error.code).json({ message: sale.error.message });
  }

  res.status(StatusCodes.OK).json(sale);
});

const create = rescue(async (req, res) => {
  const newSaleArr = req.body;
  const sales = await SaleService.create(newSaleArr);
  return res.status(StatusCodes.CREATED).json(sales);
});

const update = rescue(async (req, res) => {
  const { id } = req.params;
  const saleUpdatedInfoArr = req.body;

  const updatedSale = await SaleService.update(id, saleUpdatedInfoArr);
  return res.status(StatusCodes.OK).json(updatedSale);
});

const remove = rescue(async (req, res) => {
  const { id } = req.params;
  const removedSale = await SaleService.remove(id);

  if (removedSale.error) {
    return res.status(removedSale.error.code)
    .json({ message: removedSale.error.message });
  } 

  res.status(removedSale.code).json();
});

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};