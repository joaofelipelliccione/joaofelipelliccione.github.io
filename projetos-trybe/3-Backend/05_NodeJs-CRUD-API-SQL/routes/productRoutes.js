const rescue = require('express-rescue');
const express = require('express');
const productsMws = require('../middlewares/productMws');
const ProductController = require('../controllers/ProductController');

const productRoutes = express.Router();

productRoutes.post('/',
productsMws.nameValidator,
productsMws.quantityValidator,
rescue(ProductController.create));

productRoutes.get('/', rescue(ProductController.findAll));
productRoutes.get('/:id', rescue(ProductController.findById));

productRoutes.put('/:id',
productsMws.nameValidator,
productsMws.quantityValidator,
rescue(ProductController.update));

productRoutes.delete('/:id', rescue(ProductController.remove));

module.exports = productRoutes;
