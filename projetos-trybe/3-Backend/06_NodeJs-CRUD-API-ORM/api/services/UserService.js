const { StatusCodes } = require('http-status-codes');
const { User } = require('../../models');
const generateToken = require('../auth/generateToken');

const findUser = async (email) => {
  const user = await User.findOne({
    where: { email },
  });

  if (user === null) {
    return {
      error: {
        code: StatusCodes.NOT_FOUND,
        message: 'User not found',
      },
    };
  }

  return user;
};

const create = async ({ displayName, email, password, image }) => {
  const newUser = await User.create({ displayName, email, password, image });
  const authToken = await generateToken(email, password, newUser.insertId);

  return { token: authToken };
};

const findAll = async () => {
  const users = await User.findAll();
  return users;
};

const findByPk = async (id) => {
  const user = await User.findByPk(id);

  if (user === null) {
    return {
      error: {
        code: StatusCodes.NOT_FOUND,
        message: 'User does not exist',
      },
    };
  }

  return user;
};

module.exports = {
  findUser,
  create,
  findAll,
  findByPk,
};