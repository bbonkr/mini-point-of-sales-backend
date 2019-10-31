import passport from 'passport';
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { jwtOptions } from '../config/jwt';
import { IVerifyOptions } from 'passport-local';
import { User } from '../entities/User';
import { getRepository, getManager } from 'typeorm';

export default () => {
    const options: StrategyOptions = {
        issuer: jwtOptions.issuer,
        audience: jwtOptions.audience,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: jwtOptions.secret,
        passReqToCallback: true,
    };
    const userRepository = getManager().getRepository(User);

    const strategy = new Strategy(
        options,
        async (
            req: Express.Request,
            payload: any,
            done: (error: any, user?: any, options?: IVerifyOptions) => void,
        ) => {
            try {
                const { username } = payload;

                // User.findOne({
                //     where: {
                //         username: username,
                //     },
                //     attributes: ['id', 'username', 'email', 'displayName'],
                //     include: [{ model: Role }, { model: Store }],
                // })
                //     .then((user) => {
                //         if (!user) {
                //             throw new Error(
                //                 'could not find a account information.',
                //             );
                //         }

                //         req.user = {
                //             id: user.id,
                //             username: user.username,
                //         };
                //         req.userInfo = user;
                //         req.roles = user.roles;

                //         done(null, user, null);
                //     })
                //     .catch((err: Error) => {
                //         done(err, null, {
                //             message: err.message,
                //         });
                //     });

                const user = await userRepository.findOne({
                    where: { username: username },
                    select: ['id', 'username', 'email', 'displayName'],
                    relations: ['roles', 'stores'],
                });

                if (!user) {
                    throw new Error('could not find a account information.');
                }

                req.user = {
                    id: user.id,
                    username: user.username,
                };
                req.userInfo = user;
                req.roles = user.roles;

                done(null, user, null);
            } catch (e) {
                console.error(e);
                done(e, null, {
                    message: e.message,
                });
            }
        },
    );

    passport.use(strategy);
};
