import express, { Request, Response, NextFunction } from 'express';
import categoryController from '../controllers/category';
import authMiddleware  from '../middlewares/admin';

const router = express.Router();

const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     description: Adds a new category to the database.
 *     tags: [categories]
 *     requestBody:
 *       description: Category data
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
 *         description: Category created successfully.
 *       400:
 *         description: Invalid input.
 */
router.post('/', authMiddleware("Admin"), asyncHandler((req: Request, res: Response) => categoryController.create(req, res)));

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     description: Retrieves a list of all categories.
 *     tags: [categories]
 *     responses:
 *       200:
 *         description: A list of categories.
 */
router.get('/', asyncHandler((req: Request, res: Response) => categoryController.findAll(req, res)));

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Get a category by ID
 *     description: Retrieve a specific category by its ID.
 *     tags: [categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A category object.
 *       404:
 *         description: Category not found.
 */
router.get('/:id', asyncHandler((req: Request, res: Response) => categoryController.findById(req, res)));

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Update a category by ID
 *     description: Update the details of a specific category by its ID.
 *     tags: [categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category to update
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated category object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category updated successfully.
 *       404:
 *         description: Category not found.
 */
router.put('/:id', authMiddleware("Admin"), asyncHandler((req: Request, res: Response) => categoryController.update(req, res)));

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     description: Remove a specific category by its ID.
 *     tags: [categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category deleted successfully.
 *       404:
 *         description: Category not found.
 */
router.delete('/:id', authMiddleware("Admin"), asyncHandler((req: Request, res: Response) => categoryController.delete(req, res)));

export default router;
