import {
    Sequelize, Model, DataTypes, BuildOptions, 
    HasManyGetAssociationsMixin,
    HasManyAddAssociationMixin,
    HasManyHasAssociationMixin,
    Association,
    HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin,
} from 'sequelize';

class User extends Model {
    public username!: string;
    public displayName!: string;
    public email!: string;
    public password!: string;
    public isEmailConfirmed!: boolean;
    public photo!: string;

    // timestamp
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    
}

export default User;

// module.exports = (sequelize, DataTypes) => {
//     const User = sequelize.define('User', {
//         username: {
//             type: DataTypes.STRING(100),
//             allowNull: false,
//         },
//         displayName: {
//             type: DataTypes.STRING(100),
//             allowNull: false,
//         },
//         email: {
//             type: DataTypes.STRING(200),
//             allowNull: false,
//             unique: true,
//         },
//         password: {
//             type: DataTypes.STRING(500),
//             allowNull: false,
//         },
//         isEmailConfirmed: {
//             type: DataTypes.BOOLEAN,
//             allowNull: false,
//             defaultValue: false,
//         },
//         photo: {
//             type: DataTypes.STRING(500),
//             allowNull: true,
//         },
//     }, {
//         charset: 'utf8mb4',
//         collate: 'utf8mb4_general_ci',
//     });
//     User.associate = db => {
//         db.User.hasMany(db.StoreAdministration);
//     };
//     return User;
// };
