import { Sequelize, DataTypes } from 'sequelize'
import Menu from './Menu';

export const menuModelInit = (sequelize: Sequelize): void => {
    Menu.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: new DataTypes.STRING(100),
            allowNull: false,
        },
        price: {
            type: new DataTypes.INTEGER(),
            allowNull: false,
        },
        image: {
            type: new DataTypes.STRING(500),
            allowNull: true,
        },
        description: {
            type: new DataTypes.TEXT(),
            allowNull: true,
        },
        point: {
            type: DataTypes.INTEGER(),
            allowNull: false,
            defaultValue: 0,
        },
    }, {
        tableName: 'menus',
        sequelize: sequelize,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
    });
};