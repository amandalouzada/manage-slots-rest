import { Request, Response, NextFunction } from "express";

export default async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new Error('token not sent');
  }
  const [, token] = authHeader.split(' ');
  res.locals.token = token;

  next();
};
