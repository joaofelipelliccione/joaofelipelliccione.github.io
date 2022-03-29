import express from 'express';
import LoginController from '../controllers/LoginController';

import userValidators from '../middlewares/validators/userValidators';

const loginRoutes = express.Router();

loginRoutes.post(
  '/',
  userValidators.usernameGap,
  userValidators.passwordGap,
  LoginController.login,
);

export default loginRoutes;