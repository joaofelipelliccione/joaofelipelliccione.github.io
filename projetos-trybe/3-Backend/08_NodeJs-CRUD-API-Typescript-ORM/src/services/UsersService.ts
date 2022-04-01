import UsersModel from '../database/models/Users';
import generateToken from '../auth/generateToken';

import { UserToRegister } from '../interfaces/User';

const create = async ({ username, password, classe, level }: UserToRegister): Promise<string> => {
  const newUser = await UsersModel.create({ username, password, classe, level });

  const token = generateToken({
    userId: newUser.userId,
    username: newUser.username,
  });
  return token;
};

export default {
  create,
};
