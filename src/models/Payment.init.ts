import { Sequelize, DataTypes } from 'sequelize';
import Payment from './Payment';

export const paymentModelInit = (sequelize: Sequelize): void => {
    Payment.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        orderAmounts: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        point: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        Amounts: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        value: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        tax: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        payMethod: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        installment: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        isCancelled: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    }, {
        tableName: 'payments',
        sequelize: sequelize,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
    });
};