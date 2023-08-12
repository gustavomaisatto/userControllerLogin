import { ILogin, ILoginAtt } from '../interfaces/ILogin';
import fs from 'fs';
import path from 'path';
export class LoginModel implements ILogin {
  pathFile = path.dirname('../database/users.txt');
  constructor() {}
  async getLogin(loginAtt: ILoginAtt): Promise<boolean> {
    fs.readFileSync(this.pathFile, 'utf-8');
    console.log({ email: loginAtt.email, password: loginAtt.password });
    return true;
  }
}
