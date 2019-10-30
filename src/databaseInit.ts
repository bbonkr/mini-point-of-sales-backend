import 'reflect-metadata';
import { ConnectionOptions, getConnection, createConnection } from 'typeorm';
import path from 'path';
import { typeormConfig } from './config/config';
// const options: ConnectionOptions = {
//     type: 'mariadb',
//     host: '192.168.10.9',
//     port: 23306,
//     username: 'pos',
//     password: 'pos',
//     database: 'pos',
//     entities: [path.join(__dirname, 'src/entities/**/*.ts')],
//     synchronize: true,
// };

createConnection(typeormConfig)
    // .then((connection) => {
    //     return connection.connect();
    // })
    .then((connection) => {
        return connection.synchronize(true);
    })
    .then((_) => {
        console.info('database synchronization is completed.');
    })
    .catch((err) => {
        console.error(err);
    });
