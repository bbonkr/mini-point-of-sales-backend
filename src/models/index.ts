import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { sequelizeConfig, IDatabaseConfig, IDatabaseConfigItem } from '../config/config';
import path from 'path';
import { User } from './User.model';
import { Store } from './Store.model';
import { Session } from '../passport/Session.model';
import { StoreAdministration } from './StoreAdministration.model';
const env = process.env.NODE_ENV || 'development';
const config: IDatabaseConfigItem = sequelizeConfig[env];

console.debug('database config: ', config);

const sequelizeOptions: SequelizeOptions = {
    ...config,
    models: [
        User,
        Store,
        Session,
        StoreAdministration,
    ],
    modelMatch: (filename: string, member: string): boolean => {
        console.debug('filename-member: ',filename, member);
        if(path.dirname(filename).includes('dist')){
            return false;
        }

        return filename.substring(0, filename.indexOf('.model')).toLowerCase() === member.toLowerCase();
    },
};

export const sequelize = new Sequelize(sequelizeOptions);
