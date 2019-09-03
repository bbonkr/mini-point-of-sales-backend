import { Sequelize, DataTypes } from 'sequelize';
import User from './User';

export const userModelInit = (sequelize: Sequelize): void => {
    User.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: new DataTypes.STRING(100),
            allowNull: false,
        },
        displayName: {
            type: new DataTypes.STRING(100),
            allowNull: false,
        },
        email: {
            type: new DataTypes.STRING(200),
            allowNull: false,
            unique: true,
        },
        password: {
            type: new DataTypes.STRING(500),
            allowNull: false,
        },
        isEmailConfirmed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        photo: {
            type: new DataTypes.STRING(500),
            allowNull: true,
        },
    },{
        tableName: 'users',
        sequelize: sequelize,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
    });
};