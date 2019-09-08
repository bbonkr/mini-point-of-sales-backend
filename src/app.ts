import express from 'express';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import morgan from 'morgan';
import cors from 'cors';
import bcrypt from 'bcrypt';
import { sequelize } from './models';
import passport = require('passport');
import { User } from './models/User.model';
import local from './passport/local';
import jwt from './passport/jwt';
import DatabaseSessionStore from './passport/databaseSessionStore';
import { IControllerBase } from './@typings/IControllerBase';
import { Role } from './models/Role.model';
import { Roles } from './@typings/enums/Roles';
import { reject } from 'bluebird';
import { UserRole } from './models/UserRole.model';

export default class App {
    public port: number;
    public readonly cookieName: string = process.env.COOKIE_NAME;

    private app: express.Application;

    constructor(controllers: IControllerBase[], port?: number) {
        this.app = express();
        this.port = port || 3000;

        this.initializeDatabaseConnection();
        this.initializePassport();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    public listen(): void {
        this.app.listen(this.port, () => {
            console.log(`[APP] App is running on the port ${this.port}`);
        });
    }

    private initializeDatabaseConnection() {
        sequelize
            .sync({
                // If force is true, each DAO will do DROP TABLE IF EXISTS ...,
                // before it tries to create its own table
                force: false,
                // If alter is true, each DAO will do ALTER TABLE ... CHANGE ... Alters tables to fit models.
                // Not recommended for production use.
                // Deletes data in columns that were removed or had their type changed in the model.
                alter: false,
            })
            .then((_) => {
                console.log('[APP] Prepare data.');

                return this.initializeRequiredDataRoles().then((count) => {
                    if (count) {
                        console.log(`[APP] Roles created. ${count} records.`);
                    } else {
                        console.log(`[APP] Roles exists. Phase passed.`);
                    }
                });
            })
            .then((_) => {
                return this.initializeRequiredDataUsers().then((count) => {
                    if (count) {
                        console.log(`[APP] System user created.`);
                    } else {
                        console.log(`[APP] System user exists. Phase passed.`);
                    }
                });
            })
            .then((_) => {
                console.log('[APP] Database ready!');
            });
    }

    private initializePassport() {
        passport.serializeUser((user: User, done) => {
            console.debug('passport.serializeUser');
            return done(null, user.id);
        });

        passport.deserializeUser(async (id: number, done) => {
            console.debug('>>>> passport.deserializeUser');
            try {
                const user = await User.findOne({
                    where: {
                        id: id,
                    },
                    attributes: [
                        'id',
                        'username',
                        'displayName',
                        'email',
                        'photo',
                    ],
                });

                return done(null, user);
            } catch (e) {
                console.error(e);
                return done(e, null);
            }
        });

        local();

        jwt();
    }

    private initializeMiddlewares(): void {
        const dbSessionStore = new DatabaseSessionStore({
            expiration: 1000 * 60 * 60 * 24 * 90,
        });

        this.app.use(morgan('dev'));

        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use('/', express.static('uploads'));

        this.app.use(
            cors({
                origin: 'http://localhost:3000',
                credentials: true,
            }),
        );

        this.app.use(cookieParser(process.env.COOKIE_SECRET));
        this.app.use(
            expressSession({
                name: this.cookieName,
                resave: false,
                saveUninitialized: false,
                secret: process.env.COOKIE_SECRET,
                cookie: {
                    httpOnly: true,
                    secure: false, // https 사용시 true
                },
                store: dbSessionStore,
            }),
        );

        this.app.use(passport.initialize());
        this.app.use(passport.session());
    }

    private initializeControllers(controllers: IControllerBase[]) {
        controllers.forEach((controller, index) => {
            this.app.use(controller.getPath(), controller.getRouter());
        });

        // 404
        this.app.get(
            '*',
            (
                req: express.Request,
                res: express.Response,
                next: express.NextFunction,
            ) => {
                res.status(404).send({ message: `Not fount: ${req.url}` });
            },
        );
    }

    private initializeRequiredDataRoles(): Promise<number> {
        return Role.findAndCountAll().then((result) => {
            const { count, rows } = result;

            if (count === 0) {
                return Role.bulkCreate([
                    { name: Roles.SYSTEM },
                    { name: Roles.MANAGER },
                ])
                    .then((users) => {
                        return users.length;
                    })
                    .catch((err) => {
                        console.error(err);
                        return 0;
                    });
            }

            return 0;
        });
    }

    private initializeRequiredDataUsers(): Promise<number> {
        const systemUsername = process.env.SYSTEM_USERNAME || 'agent';
        return User.findAndCountAll({
            where: { username: systemUsername },
        }).then((result) => {
            const { count, rows } = result;

            if (count === 0) {
                return bcrypt
                    .hash(process.env.SYSTME_PASSWORD || 'minipos@**@', 12)
                    .then((hashedPassword) => {
                        if (hashedPassword) {
                            const systemUser = new User({
                                username: systemUsername,
                                password: hashedPassword,
                                displayName: 'system',
                                email:
                                    process.env.SYSTEM_EMAIL ||
                                    'test@sample.com',
                            });
                            return systemUser.save();
                        }
                    })
                    .then((user) => {
                        return Role.findOne({
                            where: { name: Roles.SYSTEM },
                        })
                            .then((role) => {
                                return UserRole.findOrCreate({
                                    where: {
                                        userId: user.id,
                                        roleId: role.id,
                                    },
                                    defaults: {
                                        userId: user.id,
                                        roleId: role.id,
                                    },
                                });
                            })
                            .spread((userRole, created) => {
                                // const created = result.length > 1 ? result[1] : false;
                                return created ? 1 : 0;
                            });
                    });
            }
        });
    }
}
