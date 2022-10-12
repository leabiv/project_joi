import { Request, Response, NextFunction } from 'express'
import boom from "@hapi/boom";
import { HttpException } from '../errors/validationError'

export function logErrors(err: any, req: Request, res: Response, next: NextFunction) {
  console.log('logErrors')
  console.error(err);
  next(err)
}

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.log('<*******ErrorHandler*********>')
  res.status(500).json({
    message: err.message,
    stack: err.stack
  });
}

export function boomErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  // if (err instanceof HttpException) {
  //   const { status, message } = err;
  //   res.status(status).json(message)
  // }
  console.log('<------BoomErrorHandler---------->')
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload)
  }
  next(err)
}
