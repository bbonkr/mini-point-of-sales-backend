import { Sequelize, DataTypes } from 'sequelize';
import StoreAdministration from './StoreAdministration';

export const storeAdministrationModelInit = (sequelize: Sequelize): void => {
    StoreAdministration.init({
        storeId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
        },
        // DataTypes.DATE:
        // https://sequelize.org/master/class/lib/data-types.js~DATE.html
        // 밀리세컨드 저장
        validAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        validUntil: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    }, {
        tableName: 'storeAdministrations',
        sequelize: sequelize,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
    });
};