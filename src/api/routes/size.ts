import express, { Request, Response, NextFunction } from "express";
import sizeController from "../controllers/size";

const router = express.Router();

const asyncHandler =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

/**
 * @swagger
 * /sizes:
 *   post:
 *     summary: Create a new size
 *     description: Adds a new size entry to the database.
 *     tags: [sizes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               value:
 *                 type: string
 *     responses:
 *       201:
 *         description: Size created successfully.
 *       400:
 *         description: Invalid input.
 */
router.post(
  "/",
  asyncHandler((req: Request, res: Response) => sizeController.create(req, res))
);

/**
 * @swagger
 * /sizes:
 *   get:
 *     summary: Get all sizes
 *     description: Retrieves a list of all sizes.
 *     tags: [sizes]
 *     parameters:
 *       - $ref: '#/components/parameters/AuthorizationHeader'
 *     responses:
 *       200:
 *         description: A list of sizes.
 */
router.get(
  "/",
  asyncHandler((req: Request, res: Response) =>
    sizeController.findAll(req, res)
  )
);

/**
 * @swagger
 * /sizes/{id}:
 *   get:
 *     summary: Get a size by ID
 *     description: Retrieve a specific size by its ID.
 *     tags: [sizes]
 *     parameters:
 *       - $ref: '#/components/parameters/AuthorizationHeader'
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the size to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A size object.
 *       404:
 *         description: Size not found.
 */
router.get(
  "/:id",
  asyncHandler((req: Request, res: Response) =>
    sizeController.findById(req, res)
  )
);

/**
 * @swagger
 * /sizes/{id}:
 *   put:
 *     summary: Update a size by ID
 *     description: Update the details of a specific size by its ID.
 *     tags: [sizes]
 *     parameters:
 *       - $ref: '#/components/parameters/AuthorizationHeader'
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the size to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               value:
 *                 type: string
 *     responses:
 *       200:
 *         description: Size updated successfully.
 *       404:
 *         description: Size not found.
 */
router.put(
  "/:id",
  asyncHandler((req: Request, res: Response) => sizeController.update(req, res))
);

/**
 * @swagger
 * /sizes/{id}:
 *   delete:
 *     summary: Delete a size by ID
 *     description: Remove a specific size by its ID.
 *     tags: [sizes]
 *     parameters:
 *       - $ref: '#/components/parameters/AuthorizationHeader'
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the size to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Size deleted successfully.
 *       404:
 *         description: Size not found.
 */
router.delete(
  "/:id",
  asyncHandler((req: Request, res: Response) => sizeController.delete(req, res))
);

export default router;
