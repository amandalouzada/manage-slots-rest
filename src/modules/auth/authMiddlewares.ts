import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import ErrorLib from "@core/ErrorLib";


const professionalMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new ErrorLib({
      message: 'invalid token',
      httpCode: 401
    });
  }
  const [, token] = authHeader.split(' ');
  const SECRET_KEY = process.env.SECRET_KEY || '';
  const { identity, sub } = JSON.parse(JSON.stringify(jwt.decode(token)));
  if (identity != 'ProfessionalIdentity' || !jwt.verify(token, SECRET_KEY)) {
    throw new ErrorLib({
      message: 'invalid token',
      httpCode: 401
    });
  }
  res.locals.id = sub;
  next();
};

const customerMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new ErrorLib({
      message: 'invalid token',
      httpCode: 401
    });
  }
  const [, token] = authHeader.split(' ');
  const SECRET_KEY = process.env.SECRET_KEY || '';

  const { identity, sub } = JSON.parse(JSON.stringify(jwt.decode(token)));

  if (identity != 'CustomerIdentity' || !jwt.verify(token, SECRET_KEY)) {
    throw new ErrorLib({
      message: 'invalid token',
      httpCode: 401
    });

  }
  res.locals.id = sub;
  next();
};

export {
  professionalMiddleware,
  customerMiddleware
}