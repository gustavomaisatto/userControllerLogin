import * as express from 'express';
import { LoginController } from './controllers/LoginController';
import { CreateUserController } from './controllers/CreateUserController';

const { PORT, NODE_ENV } = process.env;

interface IAppControllers {
  userLogin: LoginController;
  userCreate: CreateUserController;
}
export class App {
  private name: string;
  private app: express.Application;

  constructor(controllers: IAppControllers) {
    this.name = `MYAPP-${NODE_ENV}`;
    this.app = express.default();
    this.app.use(express.json());
    this.app.post('/users/login', controllers.userLogin.handleGetLogin);
    this.app.post('/users/create', controllers.userCreate.createUser);
  }

  getApp() {
    return this.app;
  }

  start() {
    this.app.listen(Number(PORT), () => {
      console.clear();
      console.log(`[${this.name}] Running on [::${PORT}]`);
    });
  }
}
