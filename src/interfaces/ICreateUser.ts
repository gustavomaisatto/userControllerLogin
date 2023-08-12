export interface ICreateUser {
  createUser(
    createUser: ICreateUserAtt,
  ): Promise<{ message: string; status: number }>;
}
export interface ICreateUserAtt {
  email: string;
  password: string;
}
