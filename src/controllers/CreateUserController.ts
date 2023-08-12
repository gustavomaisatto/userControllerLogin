import { ICreateUser } from '../interfaces/ICreateUser';
import * as express from 'express';
export interface ICreateUserController {
  createUser(req: express.Request, res: express.Response): Promise<void>;
}

export class CreateUserController implements ICreateUserController {
  private createUserRepo: ICreateUser;
  constructor(createUserRepo: ICreateUser) {
    this.createUserRepo = createUserRepo;
    this.createUser = this.createUser.bind(this);
  }

  async createUser(_req: express.Request, res: express.Response) {
    const { email, password } = _req.body;
    const login = await this.createUserRepo.createUser({ email, password });
    res.status(login.status).json(login.message);
  }
}
