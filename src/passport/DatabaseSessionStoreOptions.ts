import { Sequelize } from 'sequelize-typescript';


export class DatabaseSessionStoreOptions{
    public expiration: number;
    public clearInterval: number;
}