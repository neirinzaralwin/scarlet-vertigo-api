import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import ApiError from "../../utils/ApiError";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new ApiError(401, "Authorization token is missing");
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new ApiError(401, "Token missing from Authorization header");
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY as string);

    (req as Request & { user: { userId?: string } }).user = {
      userId: (decoded as { userId: string }).userId
    };

    next();
  } catch (error) {
    res.status(401).json({ error: (error as Error).message });
  }
};

export default authMiddleware;
