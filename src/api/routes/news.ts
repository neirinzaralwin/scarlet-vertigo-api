import express, { Request, Response, NextFunction } from 'express';
import NewsController from '../controllers/news';
import upload from '../../config/fileUpload';

const router = express.Router();

const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

/**
 * @swagger
 * /news:
 *   post:
 *     summary: Create a news entry
 *     description: Creates a new news entry, including an optional image upload.
 *     tags: [news]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Optional image file for the news.
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: News created successfully.
 *       400:
 *         description: Invalid input.
 */
router.post('/', upload.single('file'), asyncHandler((req: Request, res: Response) => NewsController.createNews(req, res)));

/**
 * @swagger
 * /news:
 *   get:
 *     summary: Get all news entries
 *     description: Retrieves a list of all news entries.
 *     tags: [news]
 *     responses:
 *       200:
 *         description: A list of news entries.
 */
router.get('/', asyncHandler((req: Request, res: Response) => NewsController.getAllNews(req, res)));

/**
 * @swagger
 * /news/{id}:
 *   get:
 *     summary: Get a news entry by ID
 *     description: Retrieve a specific news entry by its ID.
 *     tags: [news]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the news entry to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A news entry object.
 *       404:
 *         description: News entry not found.
 */
router.get('/:id', asyncHandler((req: Request, res: Response) => NewsController.getNewsById(req, res)));

/**
 * @swagger
 * /news/{id}:
 *   put:
 *     summary: Update a news entry by ID
 *     description: Update the details of a specific news entry by its ID.
 *     tags: [news]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the news entry to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: News entry updated successfully.
 *       404:
 *         description: News entry not found.
 */
router.put('/:id', asyncHandler((req: Request, res: Response) => NewsController.updateNews(req, res)));

/**
 * @swagger
 * /news/{id}:
 *   delete:
 *     summary: Delete a news entry by ID
 *     description: Remove a specific news entry by its ID.
 *     tags: [news]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the news entry to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: News entry deleted successfully.
 *       404:
 *         description: News entry not found.
 */
router.delete('/:id', asyncHandler((req: Request, res: Response) => NewsController.deleteNews(req, res)));

export default router;
