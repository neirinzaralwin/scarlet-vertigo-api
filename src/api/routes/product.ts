import express, { Request, Response, NextFunction } from 'express';
import productController from '../controllers/product';
import upload from '../../config/fileUpload';

const router = express.Router();

const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Routes
router.post('/', upload.single('file'), asyncHandler((req: Request, res: Response) => productController.createProduct(req, res)));
router.get('/', asyncHandler((req: Request, res: Response) => productController.getAllProducts(req, res)));
router.get('/:id', asyncHandler((req: Request, res: Response) => productController.getProductById(req, res)));
router.put('/:id', asyncHandler((req: Request, res: Response) => productController.updateProduct(req, res)));
router.delete('/:id', asyncHandler((req: Request, res: Response) => productController.deleteProduct(req, res)));

export default router;
