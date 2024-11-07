import express, { Request, Response, NextFunction } from 'express';
import NewsController from '../controllers/news';
import upload from '../../config/fileUpload';

const router = express.Router();

const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

router.post('/',upload.single('file'), asyncHandler((req: Request, res: Response) => NewsController.createNews(req, res)));

router.get('/', asyncHandler((req: Request, res: Response) => NewsController.getAllNews(req, res)));
router.get('/:id', asyncHandler((req: Request, res: Response) => NewsController.getNewsById(req, res)));
router.put('/:id', asyncHandler((req: Request, res: Response) => NewsController.updateNews(req, res)));
router.delete('/:id', asyncHandler((req: Request, res: Response) => NewsController.deleteNews(req, res)));

export default router;