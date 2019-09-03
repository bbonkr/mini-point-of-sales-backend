import { Sequelize, DataTypes } from 'sequelize'
import Customer from './Customer';

export const customerModelInit = (sequelize: Sequelize): void => {
    Customer.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        mobile: {
            type: new DataTypes.STRING(20),
            allowNull: false,
        },
        name: {
            type: new DataTypes.STRING(50),
            allowNull: true,
        },
    }, {
        tableName: 'customers',
        sequelize: sequelize,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',    
    });
};