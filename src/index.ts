import { App } from './App';
import { CreateUserController } from './controllers/CreateUserController';
import { LoginController } from './controllers/LoginController';
import { CreateUserModel } from './models/CreateUserModel';
import { LoginModel } from './models/LoginModel';
const userLogin = new LoginController(new LoginModel());
const userCreate = new CreateUserController(new CreateUserModel());
new App({ userLogin, userCreate }).start();
