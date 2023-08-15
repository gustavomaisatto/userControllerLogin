import { CustomError } from './../interfaces/errors/ICustomError';
import { Request, Response, NextFunction } from 'express';
export function errorHandler(
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  const errorMessage = err.message || 'Erro Interno do Servidor';
  res.status(statusCode).json({ error: errorMessage });
}
