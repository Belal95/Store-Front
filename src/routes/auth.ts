import { Router, Request, Response } from 'express';
import { makeAuthServices } from '../services/auth';
import { User } from '../models';

export const authRouter = Router();

const services = makeAuthServices();

authRouter.post(
  '/register',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const user: Omit<User, 'id'> = req.body as {
        username: string;
        password: string;
        firstName: string;
        lastName: string;
      };
      const userInfo = await services.createAccount(user);
      // res.cookie('tokenKey', userInfo.token);
      res.json(userInfo);
    } catch (err) {
      res.status(404).send(`Failed to add account ${err}`);
    }
  }
);

authRouter.post(
  '/login',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const credentials = req.body as { username: string; password: string };
      const userInfo = await services.login(
        credentials.username,
        credentials.password
      );
      // res.cookie('tokenKey', userInfo.token);
      res.send(userInfo);
    } catch (err) {
      res.status(404).send('Failed to login');
    }
  }
);
