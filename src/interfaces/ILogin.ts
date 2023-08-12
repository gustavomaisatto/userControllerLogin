export interface ILogin {
  getLogin(loginAtt: ILoginAtt): Promise<boolean>;
}

export interface ILoginAtt {
  email: string;
  password: string;
}
