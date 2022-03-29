import express from 'express';
import UserController from '../controllers/UserController';

import userValidators from '../middlewares/validators/userValidators';

const userRoutes = express.Router();

userRoutes.post(
  '/',
  userValidators.usernameGap,
  userValidators.classeGap,
  userValidators.levelGap,
  userValidators.passwordGap,
  UserController.create,
);

export default userRoutes;