import { ILogin, ILoginAtt } from '../interfaces/ILogin';
import fs from 'fs';
import path from 'path';
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
      return email === loginVerify.email && password === loginVerify.password;
    });
    const hasData = lineFilter.length > 0;
    if (hasData) {
      return true;
    } else {
      return false;
    }
  }
}
