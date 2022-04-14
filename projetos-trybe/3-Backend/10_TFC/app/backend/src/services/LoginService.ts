import * as bcrypt from 'bcryptjs'; // Biblioteca voltada à encriptação de dados. Adicionada ao arquivo "packages.npm".
import generateToken from '../auth/generateToken';
import UsersModels from '../database/models/UsersModel';
import { IUser, ILoggedInUser } from '../interfaces/loginInterfaces';

const login = async ({ email, password }: IUser): Promise<ILoggedInUser | null> => {
  const user = await UsersModels.findOne({ where: { email } });

  if (user === null) return null;

  // Descriptografa a senha salva no banco e a compara com a senha passada no login.
  const isTheSamePw = await bcrypt.compare(password, user.password);
  if (isTheSamePw === false) return null;

  const token = await generateToken({ email, username: user.username, role: user.role });
  return {
    user: {
      id: Number(user.id),
      username: user.username,
      role: user.role,
      email: user.email,
    },
    token,
  };
};

export default {
  login,
};
