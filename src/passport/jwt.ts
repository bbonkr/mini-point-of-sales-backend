import express from 'express';
import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { jwtOptions } from '../config/jwt';
import { User } from '../models/User.model';
import { IVerifyOptions } from 'passport-local';

export default () => {
    const options = {
        ...jwtOptions,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: jwtOptions.secret,
        passReqToCallback: true,
    };

    const strategy = new Strategy(
        options,
        async (
            req: express.Request,
            payload: any,
            done: (error: any, user?: any, options?: IVerifyOptions) => void,
        ) => {
            try {
                const { username } = payload;

                User.findOne({
                    where: {
                        username: username,
                    },
                    attributes: ['id', 'username', 'email', 'displayName'],
                })
                    .then((user) => {
                        if (!user) {
                            throw new Error(
                                'could not find a account information.',
                            );
                        }

                        req.user = user;

                        done(null, user, null);
                    })
                    .catch((err: Error) => {
                        done(err, null, {
                            message: err.message,
                        });
                    });
            } catch (e) {
                console.error(e);
                done(e, null, {
                    message: e,
                });
            }
        },
    );

    passport.use(strategy);
};
