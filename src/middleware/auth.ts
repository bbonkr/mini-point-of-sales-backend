import passport from 'passport';
import express from 'express';
// const passport = require('passport');

export const passportJwt = (req: express.Request , res: express.Response, next: any) => {
    const strategy: string = 'jwt';
    const authenticateOptions: passport.AuthenticateOptions = {
         session: false,
    };

    passport.authenticate(strategy, authenticateOptions, (err, token, info) => {
        if(info){
            return res.status(400).json({
                code: 'ERR-008',
                message: info.message
            });
        }

        if(err || !token){
            return res.status(401).json({
                code: 'ERR-007',
                message: 'Please log in.',
            });
        }

        return next();
    })(req, res, next);
};
