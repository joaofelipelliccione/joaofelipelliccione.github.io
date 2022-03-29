import { Pool } from 'mysql2/promise';

import { UserInfoToLogin } from '../interfaces/Login';
import { User } from '../interfaces/User';

class LoginModel {
  private connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async findOne(userInfo: UserInfoToLogin): Promise<User> {
    const { username, password } = userInfo;
    const query = 'SELECT * FROM Trybesmith.Users WHERE '
      + 'username = ? AND password = ?';
  
    const [data] = await this.connection.execute(query, [username, password]);
    // Utilizei [data] pois o connection.execute, acima, retorna um array de arrays.
    // A constante "data", em caso de sucesso, será um array com um objeto referente às informações do usuário.
    // Já em caso de fracasso, será um array vazio.

    const [userInfoObj] = data as User[];
    // Utilizei [userInfoObj] pois quis pegar o objeto que estava dentro do array "data" (desestruturação de arrays).
    // Utilizei a palavra reservado "as" para afirmar que "data" é um array e pode ser desestruturado.

    return userInfoObj;
  }
}

export default LoginModel;