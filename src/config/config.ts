import dotenv from 'dotenv';
import { DatabaseConfig } from '../lib/DatabaseConfig';
import path from 'path';

dotenv.config();

export const typeormConfig: DatabaseConfig = {
  development: {
    name: 'default',
    type: 'mariadb',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '3306', 10) || 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    extra: { charset: 'utf8mb4' },
    entities: [path.resolve(__dirname, '../entities/**/*.entity{.ts,.js}')],
    logging: true,
    synchronize: false
  },
  production: {
    name: 'default',
    type: 'mariadb',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '3306', 10) || 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    extra: { charset: 'utf8mb4' },
    entities: [path.resolve(__dirname, '../entities/**/*.entity{.ts,.js}')],
    logging: true,
    synchronize: false
  },
  test: {
    name: 'default',
    type: 'sqlite',
    database: process.env.DB_DATABASE || 'testdatabase',
    entities: [path.resolve(__dirname, '../entities/**/*.entity{.ts,.js}')],
    logging: true,
    synchronize: true
  }
};
