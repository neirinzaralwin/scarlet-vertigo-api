import express, { Request, Response, NextFunction } from 'express';
import cartController from '../controllers/cart';
import userMiddleware  from '../middlewares/user';

const router = express.Router();

const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.post('/',  userMiddleware, asyncHandler((req: Request, res: Response) => cartController.createAddToCart(req, res)));

export default router;
