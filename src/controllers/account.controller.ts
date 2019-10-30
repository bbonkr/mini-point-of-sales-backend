import express from 'express';
import passport from 'passport';
import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { jwtOptions } from '../config/jwt';
import { SessionRequest } from '../@typings/SessionRequest';
import { ControllerBase } from '../@typings/ControllerBase';
import { HttpStatusError } from '../@typings/HttpStatusError';
import { JsonResult } from '../@typings/JsonResult';
import { Roles } from '../@typings/enums/Roles';
import { User } from '../entities/User';
import { Role } from '../entities/Role';
import { getRepository, getManager } from 'typeorm';

export default class AccountController extends ControllerBase {
    public getPath(): string {
        return '/api/account';
    }

    protected initializeRoutes(): void {
        this.router.post('/signin', this.signin);
        this.router.post('/signout', this.signout);
        this.router.post('/register', this.register);
    }

    /**
     * 로그인 요청
     * POST: /api/account/signin
     * {
     *      username,
     *      password
     * }
     * @param req
     * @param res
     * @param next
     */
    private signin(
        req: Express.Request,
        res: express.Response,
        next: express.NextFunction,
    ): any {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                console.error(err);
                next(err);
            }

            if (info) {
                return res.status(401).send(info.reason);
            }

            // req.login 실행시 passport.serialize 실행
            return req.login(user, { session: false }, async (loginErr) => {
                if (loginErr) {
                    return next(loginErr);
                }

                try {
                    // const user = await findUserById(user.id);
                    const signOptions = {
                        expiresIn: '7d',
                        issuer: jwtOptions.issuer,
                        audience: jwtOptions.audience,
                        subject: 'userInfo',
                    };

                    const payload = {
                        id: user.id,
                        username: user.username,
                        displayName: user.displayName,
                        email: user.email,
                    };
                    const token = jsonwebtoken.sign(
                        payload,
                        jwtOptions.secret,
                        signOptions,
                    );

                    return res.json(
                        new JsonResult({
                            success: true,
                            data: {
                                user,
                                token,
                            },
                        }),
                    );
                } catch (e) {
                    console.error(e);
                    return next(e);
                }
            });
        })(req, res, next);
    }

    private signout(
        req: SessionRequest,
        res: express.Response,
        next: express.NextFunction,
    ): any {
        const cookieName = process.env.COOKIE_NAME;
        try {
            req.logout();

            if (req.session) {
                req.session.destroy((err) => {
                    console.error(err);
                });
            }

            return res.clearCookie(cookieName).send(
                new JsonResult({
                    success: true,
                    data: 'logout success.',
                    message: 'logout success.',
                }),
            );
        } catch (e) {
            console.error(e);
            next(e);
        }
    }

    private async register(
        req: SessionRequest,
        res: express.Response,
        next: express.NextFunction,
    ): Promise<any> {
        const { username, password, email, displayName } = req.body;

        try {
            if ((username || '').trim().length === 0) {
                throw new HttpStatusError({
                    code: 400,
                    message: `Username does not allow empty value.`,
                });
            }

            if ((password || '').trim().length === 0) {
                throw new HttpStatusError({
                    code: 400,
                    message: `Password does not allow empty value.`,
                });
            }

            if ((email || '').trim().length === 0) {
                throw new HttpStatusError({
                    code: 400,
                    message: `Email does not allow empty value.`,
                });
            }

            if ((displayName || '').trim().length === 0) {
                throw new HttpStatusError({
                    code: 400,
                    message: `DisplayName does not allow empty value.`,
                });
            }

            // const { count: countUsername, rows } = await User.findAndCountAll({
            //     where: {
            //         username: username,
            //     },
            // });

            const userRepository = getManager().getRepository(User);
            const roleRepository = getManager().getRepository(Role);

            const countUsername = await userRepository.count({
                where: { username: username },
            });

            if (countUsername > 0) {
                throw new HttpStatusError({
                    code: 409,
                    message: `username ${username} used by other user.`,
                });
            }

            // const { count: countEmail } = await User.findAndCountAll({
            //     where: {
            //         email: email,
            //     },
            // });

            const countEmail = await userRepository.count({
                where: { email: email },
            });

            if (countEmail > 0) {
                throw new HttpStatusError({
                    code: 409,
                    message: `email ${email} used by other user.`,
                });
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            // const newUser = new User({
            //     username: username,
            //     password: hashedPassword,
            //     email: email,
            //     displayName: displayName,
            // });

            const newUser: User = new User();
            newUser.username = username;
            newUser.displayName = displayName;
            newUser.email = email;
            newUser.password = hashedPassword;

            // TODO send virify email.
            // const user = await newUser.save();
            // const role = await Role.findOne({
            //     where: {
            //         name: Roles.MANAGER,
            //     },
            // });

            const role = await roleRepository.findOne({
                where: { name: Roles.MANAGER },
            });

            if (role) {
                // const userRole = new UserRole({
                //     userId: user.id,
                //     roleId: role.id,
                // });
                newUser.roles = [role];
            } else {
                throw new HttpStatusError({
                    code: 500,
                    message: 'Data corrupted. contact system admin',
                });
            }

            await userRepository.save(newUser);

            return res.status(201).json(
                new JsonResult({
                    success: true,
                }),
            );
        } catch (err) {
            return next(err);
        }
    }
}
