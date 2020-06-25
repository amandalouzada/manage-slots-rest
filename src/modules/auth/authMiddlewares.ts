import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';


const professionalMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new Error('invalid token');
  }
  const [, token] = authHeader.split(' ');
  const { identity, sub } = JSON.parse(JSON.stringify(jwt.decode(token)));
  if (identity === 'ProfessionalIdentity'){
    res.locals.id = sub;
    next();
  }
  throw new Error('invalid token');
};

const customerMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new Error('invalid token');
  }
  const [, token] = authHeader.split(' ');
  const { identity, sub } = JSON.parse(JSON.stringify(jwt.decode(token)));
  if (identity === 'CustomerIdentity'){
    res.locals.id = sub;
    next();
  }
  throw new Error('invalid token');
};

export {
  professionalMiddleware,
  customerMiddleware
}