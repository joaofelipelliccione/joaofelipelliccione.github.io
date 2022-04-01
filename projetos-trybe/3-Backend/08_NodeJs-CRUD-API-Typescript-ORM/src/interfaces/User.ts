export interface UserToRegister {
  username: string;
  password: string;
  classe: string;
  level: number;
}

export interface User extends UserToRegister {
  userId: number;
}
