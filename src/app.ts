import express from 'express';
import bodyParse from 'body-parser';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import morgan from 'morgan';
import cors from 'cors';
import { sequelize } from './models';
import passport = require('passport');
import { User } from './models/User.model';
import local from './passport/local';
import jwt from './passport/jwt';
import DatabaseSessionStore from './passport/databaseSessionStore';
import { DatabaseSessionStoreOptions } from './passport/DatabaseSessionStoreOptions';
import { IControllerBase } from './abstractions/IControllerBase';



export default class App {
    private app: express.Application;
    public port: number;
    public readonly cookieName: string = process.env.COOKIE_NAME;

    constructor(controllers: IControllerBase[], port?: number){
        this.app = express();
        this.port = port || 3000; 

        this.initializeDatabaseConnection();
        this.initializePassport();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    private initializeDatabaseConnection(){
        
        sequelize.sync({
            // If force is true, each Model will run DROP TABLE IF EXISTS,
            // before it tries to create its own table
            force: false,
        }).then(_ => {
            console.log('Database ready!');
        });
    }

    private initializePassport(){
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
                    attributes: ['id', 'username', 'displayName', 'email', 'photo']
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

        this.app.use(cors({
            origin: 'http://localhost:3000',
            credentials: true,
        }));

        this.app.use(cookieParser(process.env.COOKIE_SECRET));
        this.app.use(expressSession({
            name: this.cookieName,
            resave: false,
            saveUninitialized: false,
            secret: process.env.COOKIE_SECRET,
            cookie: {
                httpOnly: true,
                secure: false, // https 사용시 true
            },
            store: dbSessionStore,
        }));

        this.app.use(passport.initialize());
        this.app.use(passport.session());
    }

    private initializeControllers(controllers: IControllerBase[]){
        controllers.forEach((controller, index) => {
            this.app.use(controller.getPath(), controller.getRouter());
        });

        // 404
        this.app.get('*', (req: express.Request, res: express.Response, next: express.NextFunction) => {
            res.status(404).send({message: `Not fount: ${req.url}`});
        });
    }

    public listen(): void {
        this.app.listen(this.port, () => {
            console.log(`App is running on the port ${this.port}`);
        });
    }
}