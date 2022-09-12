import { Request, Response, NextFunction } from 'express'
import boom from "@hapi/boom";

export function logErrors(err: any, req: Request, res: Response, next: NextFunction) {
  console.log('logErrors')
  console.error(err);
  next(err)
}

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.log('ErrorHandler')
  res.status(500).json({
    message: err.message,
    stack: err.stack
  });
}

export function boomErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload)
  }
  next(err)
}
