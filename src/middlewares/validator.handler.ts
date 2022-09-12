import { Request, Response, NextFunction } from 'express'
import Joi from "joi";
import boom from "@hapi/boom";

export function validatorHandler(schema: Joi.Schema, property: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    //const data = req[property];
    const data = req.params[property];
    const { error } = schema.validate(data, { abortEarly: false });
    if(error){
      next(boom.badRequest('error', error));
    }
    next();
  }
}

function validatorHandlerBody(schema: Joi.Schema, property: any){
  return (req: Request, res: Response, next: NextFunction) =>{
    const body = req.body;
    const { error } = schema.validate(body, { abortEarly: false });
    if(error){
      boom.badRequest('error', error)
    }
    next();
  }
}

function validatorHandlerParams(schema: Joi.Schema, property: any){
  return (req: Request, res: Response, next: NextFunction) =>{
    const param = req.params;
    const { error } = schema.validate(param, { abortEarly: false });
    if(error){
      boom.badRequest('error', error)
    }
    next();
  }
}

function validatorHandlerQuery(schema: Joi.Schema, property: any){
  return (req: Request, res: Response, next: NextFunction) =>{
    const query = req.query;
    const { error } = schema.validate(query, { abortEarly: false });
    if(error){
      boom.badRequest('error', error)
    }
    next();
  }
}
