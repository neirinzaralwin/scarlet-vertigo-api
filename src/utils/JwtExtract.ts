import { Request } from "express";

const getUserId = (req: Request): string => {
  return (req as Request & { user?: { userId: string } }).user?.userId ?? "";
};

export { getUserId };
