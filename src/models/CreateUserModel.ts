import { ICreateUser, ICreateUserAtt } from '../interfaces/ICreateUser';
import fs from 'fs';
import path from 'path';
import { hash } from 'bcrypt';
import { ICreateUserRepo } from '../interfaces/ICreateUserRepo';
export class CreateUserModel implements ICreateUser {
  constructor() {}
  private filePath = path.join(__dirname, '../database/users.txt');
  async createUser(
    createUser: ICreateUserAtt,
  ): Promise<{ message: string; status: number }> {
    const userData = fs.readFileSync(this.filePath, 'utf-8');
    const users: ICreateUserRepo[] = [];
    const lines = userData.split('\n');
    if (!this.verifyEmail(createUser.email)) {
      return { message: 'deu erro', status: 400 };
    }
    const passwordHash = await hash(createUser.password, 10);
    lines.forEach((line) => {
      const [email, password] = line.split(',');
      if (line !== '') {
        users.push({ email, password });
      }
    });
    users.push({ email: createUser.email, password: passwordHash });
    const userDataTxt = users
      .map((user) => `${user.email},${user.password}`)
      .join('\n');
    fs.writeFileSync(this.filePath, userDataTxt);

    return { message: 'User Created!', status: 200 };
  }
  private verifyEmail(email: string) {
    const userData = fs.readFileSync(this.filePath, 'utf-8');
    const lines = userData.split('\n');
    const emails = lines.map((line) => {
      const [email, password] = line.split(',');
      return email;
    });
    if (emails.includes(email)) {
      return false;
    }
    return true;
  }
}
