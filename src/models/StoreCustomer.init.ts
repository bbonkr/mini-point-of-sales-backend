import { Sequelize, DataTypes } from 'sequelize';
import StoreCustomer from './StoreCustomer';
import Store from './Store';

export const storeCustomerModelInit = (sequelize: Sequelize): void => {
    StoreCustomer.init({
        storeId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
        },
        customerId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
        },
        point: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    }, {
        tableName: 'StoreCustomers',
        sequelize: null,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
    });
    
    StoreCustomer.belongsToMany(Store, {
        sourceKey: 'id',
        targetKey: 'storeId',
        through: 'StoreCustomers',
        as: 'Customers'
    });
};
