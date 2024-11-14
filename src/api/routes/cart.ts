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
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productID:
 *                 type: string
 *                 description: product id to add to cart list
 *               quantity:
 *                 type: integer
 *                 description: number of items to add to cart list
 *             required:
 *               - productID
 *               - quantity
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

router.patch('/:id', userMiddleware, asyncHandler((req: Request, res: Response) => cartController.updateCartItem(req, res)));

/**
 * @swagger
 * /carts/{id}:
 *   delete:
 *     summary: Delete a cart by ID
 *     description: Remove a specific cart by its ID.
 *     tags: [carts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the cart to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: cart deleted successfully.
 *       404:
 *         description: cart not found.
 */
router.delete('/:id', userMiddleware, asyncHandler((req: Request, res: Response) => cartController.removeItemFromCarts(req, res)));

export default router;
