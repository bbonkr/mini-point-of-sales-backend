import Request from '../@types/express.Request.InlcudeRole';
import passport from 'passport';
import {
    Strategy,
    IStrategyOptionsWithRequest,
    IVerifyOptions,
} from 'passport-local';
import bcrypt from 'bcrypt';
import { User } from '../entities/User';
import { Store } from '../entities/Store';
import { Role } from '../entities/Role';
import { getRepository, getManager } from 'typeorm';

export default () => {
    const userRepository = getManager().getRepository(User);
    passport.use(
        new Strategy(
            {
                usernameField: 'username',
                passwordField: 'password',
                passReqToCallback: true,
                session: false,
            },
            async (
                req: Express.Request,
                username: string,
                password: string,
                done: (
                    error: any,
                    user?: User,
                    options?: IVerifyOptions,
                ) => void,
            ) => {
                try {
                    const user = await userRepository.findOne({
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
                        // const transferUser: User = await User.findOne({
                        //     where: { id: user.id },
                        //     attributes: [
                        //         'id',
                        //         'username',
                        //         'displayName',
                        //         'email',
                        //         'photo',
                        //     ],
                        //     include: [
                        //         { model: Role, attributes: ['id', 'name'] },
                        //         { model: Store, attributes: ['id', 'name'] },
                        //     ],
                        // });

                        const transferUser = await userRepository.findOne({
                            where: { id: user.id },
                            select: [
                                'id',
                                'username',
                                'displayName',
                                'email',
                                'photo',
                            ],
                            // TODO 필드 제한
                            relations: ['roles', 'stores'],
                        });

                        req.user = {
                            id: transferUser.id,
                            username: transferUser.username,
                        };
                        req.userInfo = transferUser;
                        req.roles = transferUser.roles;

                        req.session.user = transferUser;
                        req.session.save((err) => {
                            if (err) {
                                console.error(err);
                            }

                            return done(null, transferUser);
                        });
                        // return done(null, transferUser);
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
