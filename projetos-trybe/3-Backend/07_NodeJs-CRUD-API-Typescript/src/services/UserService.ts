import UserModel from '../models/UserModel';
import connection from '../models/connection';
import generateToken from '../auth/generateToken';

import { UserToRegister } from '../interfaces/User';
import InfoToCreateToken from '../interfaces/Token';

const create = async (userInfo: UserToRegister): Promise<string> => {
  const userModel = new UserModel(connection);
  const newUser = await userModel.create(userInfo);

  const { id, username }: InfoToCreateToken = newUser;
  const token = generateToken({ id, username });
  return token;
};

export default {
  create,
};