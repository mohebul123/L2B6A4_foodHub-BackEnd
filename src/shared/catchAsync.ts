import { NextFunction, Request, RequestHandler, Response } from "express";
import { success } from "zod";

const catchAsync = (fn: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error: any) {
      console.log(error);
      next(error);
    }
  };
};

export default catchAsync;
