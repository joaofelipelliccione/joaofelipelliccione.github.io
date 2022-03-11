const express = require('express');
const rescue = require('express-rescue');
const CategoryController = require('../controllers/CategoryController');

const categoryRoutes = express.Router();
const verifyToken = require('../auth/verifyToken');
const {
  nameGapValidator,
} = require('../middlewares/validators');

categoryRoutes.post('/',
verifyToken,
nameGapValidator,
rescue(CategoryController.create));

categoryRoutes.get('/',
verifyToken,
rescue(CategoryController.findAll));

module.exports = categoryRoutes;