import { Sequelize } from 'sequelize-typescript';


export interface DatabaseSessionStoreOptions{
    expiration?: number;
    clearInterval?: number;
}