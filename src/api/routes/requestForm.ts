import express, { Request, Response, NextFunction } from 'express';
import formController from '../controllers/userForm';

const router = express.Router();

const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

/**
 * @swagger
 * /userForm:
 *   post:
 *     summary: Create a new form entry
 *     description: Creates a new entry in the user form.
 *     tags: [request-form]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fieldName1:
 *                 type: string
 *               fieldName2:
 *                 type: number
 *               fieldName3:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Form entry created successfully.
 *       400:
 *         description: Invalid input.
 */
router.post('/', asyncHandler((req: Request, res: Response) => formController.create(req, res)));

/**
 * @swagger
 * /userForm:
 *   get:
 *     summary: Get all form entries
 *     description: Retrieves a list of all form entries.
 *     tags: [request-form]
 *     responses:
 *       200:
 *         description: A list of form entries.
 */
router.get('/', asyncHandler((req: Request, res: Response) => formController.findAll(req, res)));

/**
 * @swagger
 * /userForm/{id}:
 *   get:
 *     summary: Get a form entry by ID
 *     description: Retrieve a specific form entry by its ID.
 *     tags: [request-form]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the form entry to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A form entry object.
 *       404:
 *         description: Form entry not found.
 */
router.get('/:id', asyncHandler((req: Request, res: Response) => formController.findById(req, res)));

/**
 * @swagger
 * /userForm/{id}:
 *   put:
 *     summary: Update a form entry by ID
 *     description: Update the details of a specific form entry by its ID.
 *     tags: [request-form]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the form entry to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fieldName1:
 *                 type: string
 *               fieldName2:
 *                 type: number
 *               fieldName3:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Form entry updated successfully.
 *       404:
 *         description: Form entry not found.
 */
router.put('/:id', asyncHandler((req: Request, res: Response) => formController.update(req, res)));

/**
 * @swagger
 * /userForm/{id}:
 *   delete:
 *     summary: Delete a form entry by ID
 *     description: Remove a specific form entry by its ID.
 *     tags: [request-form]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the form entry to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Form entry deleted successfully.
 *       404:
 *         description: Form entry not found.
 */
router.delete('/:id', asyncHandler((req: Request, res: Response) => formController.delete(req, res)));

export default router;
