import { Sequelize, DataTypes } from 'sequelize'
import OrderDetail from './OrderDetail';

export const orderDetailModelInit = (sequelize: Sequelize): void => {
    OrderDetail.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            defaultValue: 0,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        discount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        takeout: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    }, {
        tableName: 'orderDetails',
        sequelize: sequelize,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
    });
};