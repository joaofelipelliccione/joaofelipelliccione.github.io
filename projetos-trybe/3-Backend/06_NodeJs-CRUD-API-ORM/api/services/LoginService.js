const { StatusCodes } = require('http-status-codes');
const UserService = require('./UserService');
const generateToken = require('../auth/generateToken');

const login = async (email, password) => {
  const user = await UserService.findUser(email);
  const isPasswordCorrect = user.password === password;
  const authToken = await generateToken(email, password, user.id);

  if (user.error || !isPasswordCorrect) {
    return {
      error: {
        code: StatusCodes.BAD_REQUEST,
        message: 'Invalid fields',
      },
    };
  }

  return { token: authToken };
};

module.exports = {
  login,
};