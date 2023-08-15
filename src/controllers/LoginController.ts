import { ILogin, ILoginAtt } from '../interfaces/ILogin';
import * as express from 'express';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { CustomError } from '../interfaces/errors/ICustomError';
export interface ILoginInterface {
  handleGetLogin(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ): Promise<void>;
}

export class LoginController implements ILoginInterface {
  private loginRepo: ILogin;
  constructor(loginRepo: ILogin) {
    this.loginRepo = loginRepo;
    this.handleGetLogin = this.handleGetLogin.bind(this);
  }

  async handleGetLogin(
    _req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const { email, password } = _req.body;

    const login = await this.loginRepo.getLogin({ email, password });
    if (login != true) {
      const error: CustomError = new Error('Email ou senha errado!');
      error.statusCode = 400;
      next(error);
      return;
    }
    const token = this.generateToken({ email, password });
    res.status(200).json({ token });
    next();
  }
  private generateToken(loginVerify: ILoginAtt) {
    const payload = {
      username: loginVerify.email,
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    };
    const secretKey = crypto.randomBytes(64).toString('hex');
    const token = jwt.sign(payload, secretKey);
    return token;
  }
}
