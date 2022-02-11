const express = require('express');
const validateMailAndPasswordMw = require('../middlewares/validators/validateMailAndPasswordMw');
const generateToken = require('../sharedFunctions/generateToken');

const loginRouter = express.Router();

loginRouter.post('/', validateMailAndPasswordMw, (_req, res) => {
  const token = generateToken();
  res.status(200).json({ token });
});

module.exports = loginRouter;