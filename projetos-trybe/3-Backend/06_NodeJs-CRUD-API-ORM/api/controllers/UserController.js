const { StatusCodes } = require('http-status-codes');
const UserService = require('../services/UserService');

const create = async (req, res, _next) => {
  const { displayName, email, password, image } = req.body;
  const existentUser = await UserService.findUser(email);

  if (!existentUser.error) {
    return res.status(StatusCodes.CONFLICT).json({ message: 'User already registered' });
  }

  const newUserAuthObj = await UserService
    .create({ displayName, email, password, image });
  return res.status(StatusCodes.CREATED).json(newUserAuthObj);
};

const findAll = async (_req, res, _next) => {
  const users = await UserService.findAll();
  return res.status(StatusCodes.OK).json(users);
};

const findByPk = async (req, res, _next) => {
  const { id } = req.params;
  const user = await UserService.findByPk(id);

  if (user.error) {
    return res.status(user.error.code).json({ message: user.error.message });
  }

  return res.status(StatusCodes.OK).json(user);
};

module.exports = {
  create,
  findAll,
  findByPk,
};