import express, { Request, Response, NextFunction } from 'express';
import formController from '../controllers/userForm';

const router = express.Router();

const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.post('/', asyncHandler((req: Request, res: Response) => formController.create(req, res)));
router.get('/', asyncHandler((req: Request, res: Response) => formController.findAll(req, res)));
router.get('/:id', asyncHandler((req: Request, res: Response) => formController.findById(req, res)));
router.put('/:id', asyncHandler((req: Request, res: Response) => formController.update(req, res)));
router.delete('/:id', asyncHandler((req: Request, res: Response) => formController.delete(req, res)));

export default router;
