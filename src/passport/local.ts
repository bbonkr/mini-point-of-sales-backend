import passport from 'passport';
import express, { Request } from 'express';
import {
    Strategy,
    IStrategyOptionsWithRequest,
    IVerifyOptions,
} from 'passport-local';
import bcrypt from 'bcrypt';
import { User } from '../models/User.model';
import { UserRole } from '../models/UserRole.model';
import { Store } from '../models/Store.model';
import { Role } from '../models/Role.model';

export default () => {
    passport.use(
        new Strategy(
            {
                usernameField: 'username',
                passwordField: 'password',
                passReqToCallback: true,
                session: false,
            },
            async (
                req: express.Request,
                username: string,
                password: string,
                done: (
                    error: any,
                    user?: User,
                    options?: IVerifyOptions,
                ) => void,
            ) => {
                try {
                    const user = await User.findOne({
                        where: { username: username },
                    });

                    if (!user) {
                        // TODO 시도 횟수 증가
                        // req.connection.remoteAddress
                        return done(null, null, {
                            message:
                                'Please check your account information and try again. Not exists email in our system.',
                        });
                    }

                    const result = await bcrypt.compare(
                        password,
                        user.password,
                    );

                    if (result) {
                        const transferUser: User = await User.findOne({
                            where: { id: user.id },
                            attributes: [
                                'id',
                                'username',
                                'displayName',
                                'email',
                                'photo',
                            ],
                            include: [
                                { model: Role, attributes: ['id', 'name'] },
                                { model: Store, attributes: ['id', 'name'] },
                            ],
                        });

                        return done(null, transferUser);
                    } else {
                        // TODO 시도 횟수 증가
                        return done(null, null, {
                            message:
                                'Please check your account info and try again.',
                        });
                    }
                } catch (e) {
                    console.error(e);

                    return done(e);
                }
            },
        ),
    );
};
