export interface UserToRegister {
  username: string;
  classe: string;
  level: number;
  password: string;
}

export interface User extends UserToRegister {
  id: number;
}