const { StatusCodes } = require('http-status-codes');

module.exports = (err, _req, res, _next) => {
  if (err.code && err.message) {
    return res.status(err.code).json({ code: err.code, message: err.message });
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
  .json({ code: StatusCodes.INTERNAL_SERVER_ERROR, message: err.message });
};