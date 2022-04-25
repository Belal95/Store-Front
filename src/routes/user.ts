import { Router, Request, Response } from 'express';
import { makeUserStore } from '../models';
import { authMiddleware } from '../middleware/auth';

export const userRouter = Router();
const store = makeUserStore();

userRouter.get(
  '/',
  authMiddleware,
  async (_req: Request, res: Response): Promise<void> => {
    try {
      const users = await store.index();
      res.json(users);
    } catch (err) {
      res.status(404).send('Failed to get users');
    }
  }
);

userRouter.get(
  '/:id',
  authMiddleware,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await store.show(Number(req.params.id));
      res.json(user);
    } catch (err) {
      res.status(404).send('Failed to get users');
    }
  }
);
