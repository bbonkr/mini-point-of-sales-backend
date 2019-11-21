import passport from 'passport';
import express from 'express';
import jsonwebtoken from 'jsonwebtoken';
import {jwtOptions} from '../config/jwtOptions';
import { JsonResult } from '../lib/JsonResult';
// const passport = require('passport');

export const authWithJwt = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  // const token = req.headers.authorization;

    // try {
    //     if (!token) {
    //         throw new HttpStatusError({ code: 401, message: 'Access denied.' });
    //     }
    // } catch (error) {
    //     return next(error);
    // }

    const strategy = 'jwt';
    const authenticateOptions: passport.AuthenticateOptions = {
        session: false,
    };

    const verifyToken = (token: string): any => {
        const verifyTokenPromise = new Promise<any>((resolve, reject) => {
            jsonwebtoken.verify(token, jwtOptions.secret, (err, decoded) => {
                if (err) {
                    reject(err);
                }
                resolve(token);
            });
        });
    };

    passport.authenticate(
        strategy,
        authenticateOptions,
    )(req, res, next);
};
