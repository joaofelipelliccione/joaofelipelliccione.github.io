const express = require('express');
const rescue = require('express-rescue');
const LoginController = require('../controllers/LoginController');

const loginRoutes = express.Router();
const {
  mailGapValidator,
  passwordGapValidator,
} = require('../middlewares/validators');

loginRoutes.post('/',
mailGapValidator,
passwordGapValidator,
rescue(LoginController.login));

module.exports = loginRoutes;