const validateMail = (mail, response) => {
  const validateMailRgx = /\S+@\S+\.\S+/; // REF: https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/

  if (!mail || mail === '') {
    return response.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!validateMailRgx.test(mail)) {
    return response.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
};

const validatePassword = (password, response) => {
  if (!password || password.length === '') {
    return response.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return response.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
};

const validateMailAndPasswordMw = (req, res, next) => {
  const { email, password } = req.body;

  validateMail(email, res);
  validatePassword(password, res);

  next();
};

module.exports = validateMailAndPasswordMw;