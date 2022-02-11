const validateDateFormat = (date, response) => {
  const validateDateRgx = /(\d{2})\/(\d{2})\/(\d{4})/;

  if (!date || date === '') {
    return response.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  if (!validateDateRgx.test(date)) {
    return response.status(400)
    .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
};

const validateRateAsInteger = (rate, response) => {
  if (!rate || rate === '') {
    return response.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  if (!(Number.isInteger(rate))) {
    return response.status(400)
    .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
};

const validateRateBetween1And5 = (rate, response) => {
  if (!rate || rate === '') {
    return response.status(400)
    .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (!(rate >= 1 && rate <= 5)) {
    return response.status(400)
    .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
};

const validateTalkObjMw = (req, res, next) => {
  const { talk: { watchedAt, rate } } = req.body;

  validateDateFormat(watchedAt, res);
  validateRateAsInteger(rate, res);
  validateRateBetween1And5(rate, res);

  next();
};

module.exports = validateTalkObjMw;