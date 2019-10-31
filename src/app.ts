import express from 'express';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import morgan from 'morgan';
import cors from 'cors';
import bcrypt from 'bcrypt';
import passport from 'passport';
import local from './passport/local';
import jwt from './passport/jwt';
import DatabaseSessionStore from './passport/DatabaseSessionStoreWithTypeorm';
import { IControllerBase } from './@typings/IControllerBase';
import { User } from './entities/User';
import { Role } from './entities/Role';
import { Roles } from './@typings/enums/Roles';
import { Store } from './entities/Store';
import { errorLogger, errorJsonResult } from './middleware/errorProcess';
import { getRepository, getManager } from 'typeorm';
import { typeormConfig } from './config/config';

export default class App {
    public port: number;
    public readonly cookieName: string = process.env.COOKIE_NAME;

    private app: express.Application;

    constructor(controllers: IControllerBase[], port?: number) {
        this.app = express();
        this.port = port || 3000;

        this.initializeDatabaseConnectionWithTypeorm();
        this.initializePassport();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    public listen(): void {
        this.app.listen(this.port, () => {
            console.log(`[APP] App is running on the port ${this.port}`);
        });
    }

    private initializeDatabaseConnectionWithTypeorm(): void {
        this.initializeRequiredDataRoles();

        this.initializeRequiredDataUsers();

        console.info('Database has been synchronized.');
    }

    private initializePassport() {
        passport.serializeUser((user: User, done) => {
            console.debug('passport.serializeUser');
            return done(null, user.id);
        });

        passport.deserializeUser(async (id: number, done) => {
            console.debug('>>>> passport.deserializeUser');
            try {
                const userRepository = getManager().getRepository(User);

                const user = await userRepository
                    .createQueryBuilder('u')
                    // .leftJoinAndSelect('p.')
                    .where('u.id = :id', { id: id })
                    .select(['id', 'username', 'displayName', 'email', 'photo'])
                    .getOne();

                // ({
                //     where: { id: id },
                //     select: ['id', 'username', 'displayName', 'email', 'photo'],
                //     relations: ['']
                // });

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

        this.app.use(errorLogger);
        this.app.use(errorJsonResult);
    }

    private initializeRequiredDataRoles(): number {
        let roleCount: number = 0;
        const roleRepository = getManager().getRepository(Role);

        roleRepository
            .createQueryBuilder('r')
            .getCount()
            .then((count) => {
                roleCount = count;
            })
            .catch((err) => {
                console.error(err);
            });

        if (roleCount === 0) {
            const systemRole = new Role();
            systemRole.name = Roles.SYSTEM;
            const managerRole = new Role();
            managerRole.name = Roles.MANAGER;

            roleRepository
                .insert([systemRole, managerRole])
                .then((result) => {
                    roleCount = result.identifiers.length;
                })
                .catch((err) => {
                    console.error(err);
                });
        }

        return roleCount;
    }

    private initializeRequiredDataUsers(): number {
        const systemUsername = process.env.SYSTEM_USERNAME || 'agent';

        let userCount: number = 0;
        const userRepository = getRepository(User);
        userRepository
            .findAndCount({ where: { username: systemUsername } })
            .then(async ([user, count]) => {
                if (count === 0) {
                    const hashedPassword = await bcrypt.hash(
                        process.env.SYSTEM_PASSWORD || 'minipos@**@',
                        12,
                    );

                    const systemUser = new User();
                    systemUser.username = systemUsername;
                    systemUser.password = hashedPassword;
                    systemUser.displayName = 'system';
                    systemUser.email = process.env.SYSTEM_EMAIL;

                    const newUser = await userRepository.save(systemUser);
                    if (newUser) {
                        userCount = 1;
                    }
                }
            })
            .catch((err) => {
                console.error(err);
            });

        return userCount;
    }
}
