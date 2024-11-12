import express, { Request, Response, NextFunction } from 'express';
import cartController from '../controllers/cart';
import userMiddleware  from '../middlewares/user';

const router = express.Router();

const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

/**
 * @swagger
 * /carts:
 *   post:
 *     summary: Add to cart list
 *     description: Adds a new cart to the database.
 *     tags: [carts]
 *     requestBody:
 *       productID: product id to add to cart list
 *       required: true
 *       quantity: number of items to add to cart list
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Item added to cart successfully.
 *       400:
 *         description: Invalid input.
 */
router.post('/',  userMiddleware, asyncHandler((req: Request, res: Response) => cartController.createAddToCart(req, res)));

/**
 * @swagger
 * /carts:
 *   get:
 *     summary: Get all carts
 *     description: Retrieves a list of all carts.
 *     tags: [carts]
 *     responses:
 *       200:
 *         description: A list of carts.
 */
router.get('/', userMiddleware, asyncHandler((req: Request, res: Response) => cartController.getAllCartItems(req, res)));

export default router;
