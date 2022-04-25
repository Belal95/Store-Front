import express, { Request, Response, json, urlencoded } from 'express';
import config from './config';
import { authRouter, orderRouter, productRouter, userRouter } from './routes';

export const app: express.Application = express();
const address: string = `0.0.0.0:${config.PORT}`;

app.use(urlencoded({ extended: true }));
app.use(json());

app.get('/', function (_req: Request, res: Response) {
  res.send('Hello World!');
});

app.use('/api/orders', orderRouter);
app.use('/api/users', userRouter);
app.use('/api/user', authRouter);
app.use('/api/products', productRouter);
app.listen(config.PORT || 3000, function () {
  console.log(`listining to app on: ${address}`);
});
