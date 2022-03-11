require('dotenv').config();
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'Token not found',
    });
  }

  try {
    const decoded = jwt.verify(authorization, SECRET);
    req.userInfo = decoded; // Disponibiliza informações do usuário na chave "userInfo", do obj req.

    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED)
    .json({
      message: 'Expired or invalid token',
    });
  }
};