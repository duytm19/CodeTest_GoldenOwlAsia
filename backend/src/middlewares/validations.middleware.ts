import type { Request, Response, NextFunction } from 'express';
import { ZodObject, ZodError } from 'zod'; 
export const validate = (schema: ZodObject) => {
  return (req: Request, res: Response, next: NextFunction): void => { 
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
    
        res.status(400).json({
          message: 'Invalid request data',
          errors: error.issues,
        });
      } else {
        next(error);
      }
    }
  };
};