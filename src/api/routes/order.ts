import express, { Request, Response, NextFunction } from 'express';
import sizeController from '../controllers/size';

const router = express.Router();

const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.post('/', asyncHandler((req: Request, res: Response) => sizeController.create(req, res)));
router.get('/', asyncHandler((req: Request, res: Response) => sizeController.findAll(req, res)));
router.get('/:id', asyncHandler((req: Request, res: Response) => sizeController.findById(req, res)));
router.put('/:id', asyncHandler((req: Request, res: Response) => sizeController.update(req, res)));
router.delete('/:id', asyncHandler((req: Request, res: Response) => sizeController.delete(req, res)));

export default router;
