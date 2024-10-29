import express, { Request, Response, NextFunction } from 'express';
import categoryController from '../controllers/category';

const router = express.Router();

const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.post('/', asyncHandler((req: Request, res: Response) => categoryController.create(req, res)));
router.get('/', asyncHandler((req: Request, res: Response) => categoryController.findAll(req, res)));
router.get('/:id', asyncHandler((req: Request, res: Response) => categoryController.findById(req, res)));
router.put('/:id', asyncHandler((req: Request, res: Response) => categoryController.update(req, res)));
router.delete('/:id', asyncHandler((req: Request, res: Response) => categoryController.delete(req, res)));

export default router;
