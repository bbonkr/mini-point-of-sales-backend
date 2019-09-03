import { Sequelize, DataTypes } from 'sequelize';
import Order from './Order';
import Store from './Store';

export const orderModelInit = (sequelize: Sequelize): void => {
    Order.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        amounts: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        discount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        storeId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
    }, {
        tableName: 'orders',
        sequelize: sequelize,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
    });

    Order.belongsTo(Store, { targetKey: 'id' });
};
