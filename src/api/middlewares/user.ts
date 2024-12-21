import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import ApiError from "../../utils/ApiError";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(new ApiError(401, "Authorization token is missing"));
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return next(new ApiError(401, "Token missing from Authorization header"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY as string) as {
      userId: string;
    };
    (req as Request & { user: { userId?: string } }).user = {
      userId: decoded.userId,
    };
    next();
  } catch (error) {
    res.status(401).json({ error: (error as Error).message });
  }
};

export default authMiddleware;
