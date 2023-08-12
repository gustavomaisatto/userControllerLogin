import { ILogin } from '../interfaces/ILogin';
import * as express from 'express';
export interface ILoginInterface {
  handleGetLogin(req: express.Request, res: express.Response): Promise<void>;
}

export class LoginController implements ILoginInterface {
  private loginRepo: ILogin;
  constructor(loginRepo: ILogin) {
    this.loginRepo = loginRepo;
    this.handleGetLogin = this.handleGetLogin.bind(this);
  }

  async handleGetLogin(_req: express.Request, res: express.Response) {
    const { email, password } = _req.body;
    const login = await this.loginRepo.getLogin({ email, password });
    res.status(200).json(login);
  }
}
