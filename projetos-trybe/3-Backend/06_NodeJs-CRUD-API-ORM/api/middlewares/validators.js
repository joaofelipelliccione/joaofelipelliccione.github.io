const { StatusCodes } = require('http-status-codes');

const mailGapValidator = (req, res, next) => {
  const { email } = req.body;

  if (email === '') {
    return res.status(StatusCodes.BAD_REQUEST)
    .json({ message: '"email" is not allowed to be empty' });
  }

  if (!email) {
    return res.status(StatusCodes.BAD_REQUEST)
    .json({ message: '"email" is required' });
  }

  next();
};

const mailFormatValidator = (req, res, next) => {
  const { email } = req.body;

  const validateMailFormatRgx = /\S+@\S+\.\S+/;
  const isMailFormatValid = validateMailFormatRgx.test(email);

  if (!isMailFormatValid) {
    return res.status(StatusCodes.BAD_REQUEST)
    .json({ message: '"email" must be a valid email' });
  }

  next();
};

const passwordGapValidator = (req, res, next) => {
  const { password } = req.body;

  if (password === '') {
    return res.status(StatusCodes.BAD_REQUEST)
    .json({ message: '"password" is not allowed to be empty' });
  }
  
  if (!password) {
    return res.status(StatusCodes.BAD_REQUEST)
    .json({ message: '"password" is required' });
  }

  next();
};

const passwordFormatValidator = (req, res, next) => {
  const { password } = req.body;

  if (password.length !== 6) {
    return res.status(StatusCodes.BAD_REQUEST)
    .json({ message: '"password" length must be 6 characters long' });
  }

  next();
};

const displayNameValidator = (req, res, next) => {
  const { displayName } = req.body;

  if (displayName.length < 8) {
    return res.status(StatusCodes.BAD_REQUEST)
    .json({ message: '"displayName" length must be at least 8 characters long' });
  }

  next();
};

const nameGapValidator = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(StatusCodes.BAD_REQUEST)
    .json({ message: '"name" is required' });
  }

  next();
};

const titleGapValidator = (req, res, next) => {
  const { title } = req.body;

  if (!title) {
    return res.status(StatusCodes.BAD_REQUEST)
    .json({ message: '"title" is required' });
  }

  next();
};

const contentGapValidator = (req, res, next) => {
  const { content } = req.body;

  if (!content) {
    return res.status(StatusCodes.BAD_REQUEST)
    .json({ message: '"content" is required' });
  }

  next();
};

const categoryIdsGapValidator = (req, res, next) => {
  const { categoryIds } = req.body;

  if (!categoryIds) {
    return res.status(StatusCodes.BAD_REQUEST)
    .json({ message: '"categoryIds" is required' });
  }

  next();
};

const categoryIdsFilledGapValidator = (req, res, next) => {
  const { categoryIds } = req.body;

  if (categoryIds) {
    return res.status(StatusCodes.BAD_REQUEST)
    .json({ message: 'Categories cannot be edited' });
  }

  next();
};

module.exports = {
  mailGapValidator,
  mailFormatValidator,
  passwordGapValidator,
  passwordFormatValidator,
  displayNameValidator,
  nameGapValidator,
  titleGapValidator,
  contentGapValidator,
  categoryIdsGapValidator,
  categoryIdsFilledGapValidator,
};