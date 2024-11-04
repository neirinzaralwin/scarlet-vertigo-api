import express, { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import path from 'path';
import productController from '../controllers/product';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../images')); 
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage });

const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Routes
router.post('/', upload.single('file'), asyncHandler((req: Request, res: Response) => productController.createProduct(req, res)));
router.get('/', asyncHandler((req: Request, res: Response) => productController.getAllProducts(req, res)));
router.get('/:id', asyncHandler((req: Request, res: Response) => productController.getProductById(req, res)));
router.put('/:id', asyncHandler((req: Request, res: Response) => productController.updateProduct(req, res)));
router.delete('/:id', asyncHandler((req: Request, res: Response) => productController.deleteProduct(req, res)));

export default router;
