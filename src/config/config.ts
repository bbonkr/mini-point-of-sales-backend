import dotenv from 'dotenv';
import { Dialect } from 'sequelize/types';
// const dotenv = require('dotenv');

dotenv.config();

/**
 * 데이터베이스 연결 구성
 */
export interface IDatabaseConfigItem {
    host: string,
    username: string,
    password: string,
    database: string,
    port: number,
    dialect: Dialect
};

/**
 * 데이터베이스 연결 구성 환경 변수별
 */
export interface IDatabaseConfig {
    [environment: string]: IDatabaseConfigItem
}

export const sequelizeConfig: IDatabaseConfig = {
    'development': {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '3306', 10) ,
        dialect: 'mariadb',
    },
    'test': {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '3306', 10) ,
        dialect: 'mariadb',
    },
    'production': {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '3306', 10) ,
        dialect: 'mariadb',
    },
};


// module.exports = {
//     development: {
//         username: process.env.DB_USERNAME,
//         password: process.env.DB_PASSWORD,
//         database: process.env.DB_DATABASE,
//         host: process.env.DB_HOST,
//         port: process.env.DB_PORT,
//         dialect: 'mariadb',
//     },
//     test: {
//         username: process.env.DB_USERNAME,
//         password: process.env.DB_PASSWORD,
//         database: process.env.DB_DATABASE,
//         host: process.env.DB_HOST,
//         port: process.env.DB_PORT,
//         dialect: 'mariadb',
//     },
//     production: {
//         username: process.env.DB_USERNAME,
//         password: process.env.DB_PASSWORD,
//         database: process.env.DB_DATABASE,
//         host: process.env.DB_HOST,
//         port: process.env.DB_PORT,
//         dialect: 'mariadb',
//     },
// };
