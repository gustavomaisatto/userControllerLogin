import { ICreateUser, ICreateUserAtt } from '../interfaces/ICreateUser';
import fs from 'fs';
import path from 'path';
export class CreateUserModel implements ICreateUser {
  constructor() {}
  private filePath = path.join(__dirname, '../database/users.txt');
  async createUser(
    createUser: ICreateUserAtt,
  ): Promise<{ message: string; status: number }> {
    try {
      const userData = fs.readFileSync(this.filePath, 'utf-8');
      const users: ICreateUserAtt[] = [];
      const lines = userData.split('\n');
      this.verifyEmail(createUser.email);
      lines.forEach((line) => {
        const [email, password] = line.split(',');
        users.push({ email, password });
      });
      users.push(createUser);
      const userDataTxt = users
        .map((user) => `${user.email},${user.password}`)
        .join('\n');
      fs.writeFileSync(this.filePath, userDataTxt);

      return { message: 'User Created!', status: 200 };
    } catch (error) {
      console.log(error);
      return { message: 'deu erro', status: 400 };
    }
  }
  private verifyEmail(email: string) {
    const userData = fs.readFileSync(this.filePath, 'utf-8');
    const lines = userData.split('\n');
    const emails = lines.map((line) => {
      const [email, password] = line.split(',');
      return email;
    });
    if (emails.includes(email)) {
      throw new Error('Email já cadastrado!');
    }
  }
}
