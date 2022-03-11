require('dotenv').config();
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;

module.exports = async (email, password, id) => {
  const user = { email, password, id };
  
  const authToken = jwt.sign(user, SECRET, {
    algorithm: 'HS256',
    expiresIn: '7d',
  });

  return authToken;
};