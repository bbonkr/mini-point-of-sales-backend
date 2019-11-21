import express from 'express';
import { HttpStatusError } from '../lib/HttpStatusError';
import { JsonResult } from '../lib/JsonResult';

const isProd = process.env.NODE_ENV === 'production';

export const errorLogger = (
  err: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  console.error(err);

  return next(err);
};

export const errorJsonResult = (
  err: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  let error: HttpStatusError;
  if (err instanceof HttpStatusError) {
    error = err as HttpStatusError;
  } else {
    error = new HttpStatusError({
      code: 500,
      message: err.message,
      inner: isProd ? undefined : err
    });
  }

  return res.status(error.code).json(JsonResult.getError(error));
};
