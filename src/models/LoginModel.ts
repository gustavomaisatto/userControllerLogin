import { ILogin, ILoginAtt } from '../interfaces/ILogin';
import fs from 'fs';
import path from 'path';
import { hash, compare } from 'bcrypt';
export class LoginModel implements ILogin {
  pathFile = path.join(__dirname, '../database/users.txt');
  constructor() {}
  async getLogin(loginAtt: ILoginAtt): Promise<boolean> {
    return await this.verifyLogin(loginAtt);
  }
  async verifyLogin(loginVerify: ILoginAtt): Promise<boolean> {
    const usersData = fs.readFileSync(this.pathFile, 'utf-8');
    const line = usersData.split('\n');
    const lineFilter = line.filter((line) => {
      const [email, password] = line.split(',');
      return email === loginVerify.email;
    });
    const passwordSplit =
      lineFilter.length > 0 ? lineFilter[0]?.split(',') : [];
    return passwordSplit.length > 0
      ? await compare(loginVerify.password, passwordSplit[1])
      : false;
  }
}
