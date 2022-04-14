export interface IUser {
  email: string,
  password: string,
}

export interface ILoggedInUser {
  user: {
    id: number,
    username: string,
    role: string,
    email: string,
  },
  token: string,
}
