import 'reflect-metadata';
import { ConnectionOptions, getConnection, createConnection } from 'typeorm';
import path from 'path';
import { typeormConfig } from './config/config';

createConnection(typeormConfig[process.env.NODE_ENV || 'development'])
    .then((connection) => {
        return connection.synchronize(true);
    })
    .then((_) => {
        console.info('database synchronization is completed.');
    })
    .catch((err) => {
        console.error(err);
    });
