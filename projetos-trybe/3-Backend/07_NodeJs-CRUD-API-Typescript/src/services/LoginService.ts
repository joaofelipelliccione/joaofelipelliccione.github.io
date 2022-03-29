import LoginModel from '../models/LoginModel';
import connection from '../models/connection';
import generateToken from '../auth/generateToken';

import { UserInfoToLogin } from '../interfaces/Login';
import InfoToCreateToken from '../interfaces/Token';

const findOne = async (userInfo: UserInfoToLogin): Promise<string | null> => { // Função que retorna uma Promise cujo resultado é uma string ou null.
  const loginModel = new LoginModel(connection);
  const user = await loginModel.findOne(userInfo);

  if (user === undefined) {
    return null;
  }

  const { id, username }: InfoToCreateToken = user;
  const token = generateToken({ id, username });
  return token;
};

export default {
  findOne,
};