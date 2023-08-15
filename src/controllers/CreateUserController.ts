import { ICreateUser } from '../interfaces/ICreateUser';
import * as express from 'express';
import { CustomError } from '../interfaces/errors/ICustomError';
export interface ICreateUserController {
  createUser(
    _req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ): Promise<void>;
}

export class CreateUserController implements ICreateUserController {
  private createUserRepo: ICreateUser;
  constructor(createUserRepo: ICreateUser) {
    this.createUserRepo = createUserRepo;
    this.createUser = this.createUser.bind(this);
  }

  async createUser(
    _req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const { email, password } = _req.body;
    const login = await this.createUserRepo.createUser({ email, password });
    if (login.status != 200) {
      const error: CustomError = new Error('Email já cadastrado.');
      error.statusCode = 400;
      next(error);
      return;
    }
    res.status(login.status).json({ message: 'Usuário criado com sucesso!' });
    next();
  }
}
