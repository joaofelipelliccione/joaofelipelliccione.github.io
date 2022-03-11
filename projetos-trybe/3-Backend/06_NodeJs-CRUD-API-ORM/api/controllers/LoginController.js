const { StatusCodes } = require('http-status-codes');
const LoginService = require('../services/LoginService');

const login = async (req, res, _next) => {
  const { email, password } = req.body;
  const authObj = await LoginService.login(email, password);

  if (authObj.error) {
    res.status(authObj.error.code)
    .json({ message: authObj.error.message });
  }

  return res.status(StatusCodes.OK).json(authObj);
};

module.exports = {
  login,
};