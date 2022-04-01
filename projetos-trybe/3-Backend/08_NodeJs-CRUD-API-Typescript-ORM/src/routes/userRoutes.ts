import express from 'express';
import UsersController from '../controllers/UsersController';

import userValidators from '../middlewares/validators/usersValidators';

const userRoutes = express.Router();

userRoutes.post(
  '/',
  userValidators.usernameGap,
  userValidators.passwordGap,
  userValidators.classeGap,
  userValidators.levelGap,
  UsersController.create,
);

export default userRoutes;
