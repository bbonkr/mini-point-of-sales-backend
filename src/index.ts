import 'reflect-metadata';
import dotenv from 'dotenv';
import App from './app';
import AccountController from './controllers/account.controller';
import SampleController from './controllers/sample.controller';
import StoreController from './controllers/store.controller';
import { getConnection, getConnectionManager, createConnection } from 'typeorm';
import { typeormConfig } from './config/config';

dotenv.config();

const port = parseInt(process.env.PORT || '3000', 10);
const host = process.env.HOST || 'localhost';
const protocol = process.env.PROTOCOL || 'http';

const dev = process.env.NODE_ENV !== 'production';
const prod = process.env.NODE_ENV === 'production';

process.on('exit', () => {
    Promise.all(
        getConnectionManager().connections.map((c) => {
            if (c) {
                return c.close();
            }
        }),
    );

    console.info('Database connections has been closed.');
    console.info('App down.');
});

createConnection(typeormConfig)
    .then((_) => {
        const app: App = new App(
            [
                new AccountController(),
                new SampleController(),
                new StoreController(),
            ],
            port,
        );

        app.listen();
    })
    .catch((error) => console.log('TypeORM connection error: ', error));
