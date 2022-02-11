// REF: https://app.betrybe.com/course/back-end/introducao-ao-desenvolvimento-web-com-nodejs/express-http-com-nodejs-gabarito/solutions/4311e102-927d-4aa5-89bb-1ded56cbe8e0/gabarito-dos-exercicios/294677e2-3a19-4802-8b63-11c399567b12?use_case=calendar 
const crypto = require('crypto'); // Módulo nativo do Node.

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
  // A função randomBytes(n) retorna um buffer de n duplas. Ex: randomBytes(8) = <Buffer 8b 90 e4 a9 07 9a d3 e4>
  // A função .toString('hex') transforma o buffer hexadecimal retornado pela randomBytes(), em uma string.
}

module.exports = generateToken;
