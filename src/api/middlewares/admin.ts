import { verify } from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";

dotenv.config();

interface TokenPayload {
  userId: string;
  role: "Admin" | "User" | "Moderator";
}

const isAuth = (requiredRole?: "Admin" | "User" | "Moderator") => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      res.status(401).json({ message: "Unauthorized." });
      return;
    }

    const token = authHeader.split(" ")[1];
    try {
      const tokenMatch = verify(token, process.env.JWT_KEY!) as TokenPayload;

      if (!tokenMatch || !tokenMatch.userId || !tokenMatch.role) {
        res.status(401).json({ message: "Invalid token." });
        return;
      }

      if (requiredRole && tokenMatch.role !== requiredRole) {
        res.status(403).json({ message: `Forbidden. ${requiredRole} role required.` });
        return;
      }

      (req as Request & { userId: string; role: "Admin" | "User" | "Moderator" }).userId = tokenMatch.userId;
      (req as Request & { userId: string; role: "Admin" | "User" | "Moderator" }).role = tokenMatch.role;

      next();
    } catch (err) {
      res.status(401).json({ message: "Unauthorized." });
    }
  };
};

export default isAuth;
