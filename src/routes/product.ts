import { Router, Request, Response } from 'express';
import { authMiddleware } from '../middleware/auth';
import { makeProudctStore, Product } from '../models';
import { productsByCategory } from '../services/products';

export const productRouter = Router();
const store = makeProudctStore();

productRouter.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (err) {
    res.status(404).send('Failed to get products');
  }
});
productRouter.get(
  '/show/:id',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const product = await store.show(Number(req.params.id));
      res.json(product);
    } catch (err) {
      res.status(404).send('Failed to get product');
    }
  }
);
productRouter.post(
  '/create',
  authMiddleware,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const product: Omit<Product, 'id'> = req.body as {
        category: string;
        name: string;
        price: number;
      };
      const result = await store.create(product);
      res.json(result);
    } catch (err) {
      res.status(404).send('Failed to create product');
    }
  }
);
productRouter.get(
  '/category',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await productsByCategory();
      res.json(result);
    } catch (err) {
      res.status(404).send('Failed to get products');
    }
  }
);
