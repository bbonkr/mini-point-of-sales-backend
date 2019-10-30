import dotenv from 'dotenv';
import { Dialect } from 'sequelize/types';
import { IDatabaseConfig } from '../@typings/IDatabaseConfig';
import { createConnection, ConnectionOptions } from 'typeorm';
import path from 'path';

dotenv.config();

export const sequelizeConfig: IDatabaseConfig = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '3306', 10),
        dialect: 'mariadb',
    },
    test: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '3306', 10),
        dialect: 'mariadb',
    },
    production: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '3306', 10),
        dialect: 'mariadb',
    },
};

export const typeormConfig: ConnectionOptions = {
    name: 'default',
    type: 'mariadb',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    extra: { charset: 'utf8mb4' },
    entities: [path.join(__dirname, '../entities/**/*.ts')],
    logging: true,
    synchronize: true,
};

// createConnection(typeormConfig);
