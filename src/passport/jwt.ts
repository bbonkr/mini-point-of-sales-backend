import express from 'express';
import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { jwtOptions } from '../config/jwt';

export default () => {
    const options = {
        ... jwtOptions,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: jwtOptions.secret,
        passReqToCallback: true,
    };
    
    const strategy = new Strategy(options, async (req: express.Request, payload: any, done: any) => {
        try {
            done(null, payload, null);
            
        } catch (e) {
            console.error(e);
            done(e, null, {
                code: 'ERR-001',
                message: e
            });
        }
    });
    
    passport.use(strategy);
};