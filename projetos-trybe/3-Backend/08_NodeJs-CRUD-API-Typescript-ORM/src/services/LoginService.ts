import UsersModel from '../database/models/Users';
import generateToken from '../auth/generateToken';

import { UserInfoToLogin } from '../interfaces/Login';

const login = async ({ username, password }: UserInfoToLogin): Promise<null | string> => {
  const user = await UsersModel.findOne({
    where: { username, password },
  });

  if (user === null) return null;

  const token = generateToken({
    userId: user.userId,
    username: user.username,
  });
  return token;
};

export default {
  login,
};
