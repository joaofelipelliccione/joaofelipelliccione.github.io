const express = require('express');
const rescue = require('express-rescue');
const UserController = require('../controllers/UserController');

const userRoutes = express.Router();
const verifyToken = require('../auth/verifyToken');
const {
  displayNameValidator,
  mailFormatValidator,
  mailGapValidator,
  passwordFormatValidator,
  passwordGapValidator,
} = require('../middlewares/validators');

userRoutes.post('/',
displayNameValidator,
mailGapValidator,
mailFormatValidator,
passwordGapValidator,
passwordFormatValidator,
rescue(UserController.create));

userRoutes.get('/',
verifyToken,
rescue(UserController.findAll));

userRoutes.get('/:id',
verifyToken,
rescue(UserController.findByPk));

module.exports = userRoutes;