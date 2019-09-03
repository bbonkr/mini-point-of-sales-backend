import { Sequelize } from 'sequelize-typescript';
import { sequelizeConfig } from '../config/config';
import path from 'path';
import { User } from './User.model';
import { Store } from './Store.model';
import { Session } from '../passport/Session.model';
const env = process.env.NODE_ENV || 'development';
const config = sequelizeConfig[env];

export const sequelize = new Sequelize({
    ...config,
    models: [
        __dirname + '/**/*.model.ts'
    ],
    modelMatch: (filename, member) => {
        
        if(path.dirname(filename).includes('dist')){
            return false;
        }

        return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
    },
});
