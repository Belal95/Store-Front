import { NextFunction, Request, Response } from 'express';
import { makeAuthServices } from '../services/auth';

const service = makeAuthServices();

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    // const cookies = req.headers.cookie;
    // const cookie = cookies?.split('; ');
    // if (!cookie) throw new Error('Unauthorized');
    // const token = cookie[0].slice(9);
    if (!token) throw new Error('Unauthorized');
    const { id, username } = service.verfiy(token) as unknown as {
      id: number;
      username: string;
    };
    res.locals.user = { id, username };
    next();
  } catch (err) {
    res.status(401).send('Unauthorized');
  }
}
