const express = require('express');
const saleMws = require('../middlewares/saleMws');
const SaleController = require('../controllers/SaleController');

const saleRoutes = express.Router();

saleRoutes.post('/',
saleMws.idValidator,
saleMws.notInformedQuantityValidator,
saleMws.quantityLowerThanOneValidator,
// saleMws.outOfStockProductsValidator,
SaleController.create);

saleRoutes.get('/', SaleController.findAll);
saleRoutes.get('/:id', SaleController.findById);

saleRoutes.put('/:id',
saleMws.idValidator,
saleMws.notInformedQuantityValidator,
saleMws.quantityLowerThanOneValidator,
SaleController.update);

saleRoutes.delete('/:id', SaleController.remove);

module.exports = saleRoutes;