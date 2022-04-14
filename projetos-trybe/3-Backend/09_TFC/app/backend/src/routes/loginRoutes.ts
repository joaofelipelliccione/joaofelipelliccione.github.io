import { Router } from 'express';
import LoginController from '../controllers/LoginController';
import loginGapsValidation from '../middlewares/validators/login';
import verifyToken from '../auth/verifyToken';

const loginRoutes = Router();

loginRoutes.get(
  '/validate',
  verifyToken,
  LoginController.validateGeneratedToken,
);

loginRoutes.post(
  '/',
  loginGapsValidation,
  LoginController.login,
);

export default loginRoutes;
