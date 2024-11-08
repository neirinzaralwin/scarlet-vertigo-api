import express, { Request, Response, NextFunction } from 'express';
import productController from '../controllers/product';
import upload from '../../config/fileUpload';

const router = express.Router();

const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     description: Creates a new product entry with an optional image upload.
 *     tags: [products]
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
 *                 description: Optional image file for the product.
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *     responses:
 *       201:
 *         description: Product created successfully.
 *       400:
 *         description: Invalid input.
 */
router.post('/', upload.single('file'), asyncHandler((req: Request, res: Response) => productController.createProduct(req, res)));

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     description: Retrieves a list of all products.
 *     tags: [products]
 *     responses:
 *       200:
 *         description: A list of products.
 */
router.get('/', asyncHandler((req: Request, res: Response) => productController.getAllProducts(req, res)));

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     description: Retrieve a specific product by its ID.
 *     tags: [products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A product object.
 *       404:
 *         description: Product not found.
 */
router.get('/:id', asyncHandler((req: Request, res: Response) => productController.getProductById(req, res)));

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     description: Update the details of a specific product by its ID.
 *     tags: [products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to update
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
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *     responses:
 *       200:
 *         description: Product updated successfully.
 *       404:
 *         description: Product not found.
 */
router.put('/:id', asyncHandler((req: Request, res: Response) => productController.updateProduct(req, res)));

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     description: Remove a specific product by its ID.
 *     tags: [products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully.
 *       404:
 *         description: Product not found.
 */
router.delete('/:id', asyncHandler((req: Request, res: Response) => productController.deleteProduct(req, res)));

export default router;
