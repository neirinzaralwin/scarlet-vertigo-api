import express, { Request, Response } from 'express';
import userController from '../controllers/auth';

const router = express.Router();

router.get('/users', (req: Request, res: Response) => userController.getAllUsers(req, res));
router.get('/users/:id', (req: Request, res: Response) => userController.getUserById(req, res));
router.put('/users/:id', (req: Request, res: Response) => userController.updateUser(req, res));
router.delete('/users/:id', (req: Request, res: Response) => userController.deleteUser(req, res));
router.post('/register', (req: Request, res: Response) => userController.register(req, res));
router.post('/login', (req: Request, res: Response) => userController.login(req, res));

export default router;
