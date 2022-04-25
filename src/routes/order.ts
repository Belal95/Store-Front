import { Router, Request, Response } from 'express';
import { authMiddleware } from '../middleware/auth';
import { makeOrderStore, Order, OrderProduct } from '../models';
import { completedOrders } from '../services/order';
import { orderProducts } from '../services/orderProducts';

export const orderRouter = Router();
const store = makeOrderStore();

orderRouter.get(
  '/show/:id',
  authMiddleware,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const order = await store.show(Number(req.params.id));
      res.json(order);
    } catch (err) {
      res.status(404).send('Failed to get order');
    }
  }
);
orderRouter.post(
  '/create',
  authMiddleware,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const order: Omit<Order, 'id'> = req.body as {
        userId: number;
        status: string;
      };
      const result = await store.create(order);
      res.json(result);
    } catch (err) {
      res.status(404).send('Failed to create order');
    }
  }
);
orderRouter.get(
  '/completed',
  authMiddleware,
  async (_req: Request, res: Response): Promise<void> => {
    try {
      const orders = await completedOrders();
      res.json(orders);
    } catch (err) {
      res.status(404).send(`Failed to get orders ${err}`);
    }
  }
);
orderRouter.post(
  '/:id/add',
  authMiddleware,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const product: OrderProduct = {
        orderId: Number(req.params.id),
        productId: req.body.productId,
        quantity: req.body.quantity,
      };
      const orders = await store.addProduct(product);
      res.json(orders);
    } catch (err) {
      res.status(404).send(`Failed to add product ${err}`);
    }
  }
);
orderRouter.get(
  '/:id/products',
  authMiddleware,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const products = await orderProducts(Number(req.params.id));
      res.json(products);
    } catch (err) {
      res.status(404).send('Failed to get order');
    }
  }
);
