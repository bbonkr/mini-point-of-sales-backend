import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { sequelizeConfig } from '../config/config';
import { User } from './User.model';
import { Store } from './Store.model';
import { Session } from '../passport/Session.model';
import { StoreAdministration } from './StoreAdministration.model';
import { Order } from './Order.model';
import { OrderDetail } from './OrderDetail.model';
import { Payment } from './Payment.model';
import { StoreCustomer } from './StoreCustomer.model';
import { Customer } from './Customer.model';
import { CustomerPayment } from './CustomerPayment.model';
import { Menu } from './Menu.model';
import { IDatabaseConfigItem } from '../@typings/IDatabaseConfigItem';

const env = process.env.NODE_ENV || 'development';
const config: IDatabaseConfigItem = sequelizeConfig[env];

const sequelizeOptions: SequelizeOptions = {
    ...config,
    models: [
        User,
        Store,
        Customer,
        Session,
        Menu,
        Order,
        OrderDetail,
        Payment,
        StoreAdministration,
        StoreCustomer,
        CustomerPayment,
    ],
};

export const sequelize = new Sequelize(sequelizeOptions);
