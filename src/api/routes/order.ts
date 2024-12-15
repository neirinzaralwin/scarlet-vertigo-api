import express, { Request, Response, NextFunction } from "express";
import orderController from "../controllers/order";
import userMiddleware from "../middlewares/user";

const router = express.Router();

const asyncHandler =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

router.post(
  "/",
  userMiddleware,
  asyncHandler((req: Request, res: Response, next: NextFunction) =>
    orderController.create(req, res, next)
  )
);
router.get(
  "/",
  userMiddleware,
  asyncHandler((req: Request, res: Response, next: NextFunction) =>
    orderController.findAll(req, res, next)
  )
);
router.get(
  "/:id",
  userMiddleware,
  asyncHandler((req: Request, res: Response, next: NextFunction) =>
    orderController.findById(req, res, next)
  )
);
router.put(
  "/:id",
  userMiddleware,
  asyncHandler((req: Request, res: Response, next: NextFunction) =>
    orderController.update(req, res, next)
  )
);
router.delete(
  "/:id",
  userMiddleware,
  asyncHandler((req: Request, res: Response, next: NextFunction) =>
    orderController.delete(req, res, next)
  )
);

export default router;
