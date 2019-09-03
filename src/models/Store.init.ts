import { Sequelize, DataTypes } from 'sequelize';
import Store from './Store';
import Order from './Order';

export const storeModelInit = (sequelize: Sequelize): void => {
    Store.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        businessType: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        tableName: 'Stores',
        sequelize: sequelize,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
    });    

    Store.hasMany(Order, {
        sourceKey: 'id',
        foreignKey: 'storeId',
        as: 'orders',
    })
};
