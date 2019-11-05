import 'reflect-metadata';
import dotenv from 'dotenv';
import App from './app';
import path from 'path';
import glob from 'glob';
import { getConnection, getConnectionManager, createConnection } from 'typeorm';
import { typeormConfig } from './config/config';
import { AccountController } from './controllers/account.controller';
import { SampleController } from './controllers/sample.controller';
import { StoreController } from './controllers/store.controller';
import { MenuController } from './controllers/menu.controller';
import { ControllerBase } from './@typings/ControllerBase';
import { IControllerBase } from './@typings/IControllerBase';

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

createConnection(typeormConfig[process.env.NODE_ENV || 'development'])
    .then((_) => {
        const files = glob.sync(
            path.join(__dirname, 'controllers/**/*.controller.*'),
        );
        files.forEach((f) => console.info('controller file=> ', f));

        return Promise.all(
            files.map((f) =>
                import(f).then((m) => {
                    console.info(
                        'import file :',
                        typeof m,
                        m instanceof ControllerBase,
                        m,
                    );
                    // if (m.hasOwnProperty('default') && m.default.length > 0) {
                    //     return m.default[0] as IControllerBase;
                    // }
                    return m;
                }),
            ),
        );
    })
    .then((controllerDefinintions) => {
        controllerDefinintions.forEach((d) =>
            console.info('controller', typeof d, d),
        );

        const controllers: ControllerBase[] = controllerDefinintions.map(
            (d) => {
                for (const name in d) {
                    if (d.hasOwnProperty(name)) {
                        // const instance = Object.create(d[name].prototype);
                        // instance.constructor.apply(instance);
                        // return instance as ControllerBase;

                        return new d[name]();
                    }
                }
            },
        );

        const app: App = new App(
            controllers,
            // [
            //     new AccountController(),
            //     new SampleController(),
            //     new StoreController(),
            //     new MenuController(),
            // ],
            port,
        );

        app.listen();
    })
    .catch((error) => console.log('TypeORM connection error: ', error));
