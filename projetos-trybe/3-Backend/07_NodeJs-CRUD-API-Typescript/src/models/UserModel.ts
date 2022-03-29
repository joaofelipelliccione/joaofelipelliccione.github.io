import { Pool, ResultSetHeader } from 'mysql2/promise';

import { UserToRegister, User } from '../interfaces/User';

class UserModel {
  private connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async create(userInfo: UserToRegister): Promise<User> {
    const { username, classe, level, password } = userInfo;
    const query = 'INSERT INTO Trybesmith.Users (username, classe, level, password) '
      + 'VALUES (?, ?, ?, ?)';
  
    const newUser = await this.connection.execute<ResultSetHeader>(query, [
      username,
      classe,
      level,
      password]);

    const [dataInserted] = newUser;
    const { insertId } = dataInserted;
    return { id: insertId, ...userInfo };
  }
}

export default UserModel;