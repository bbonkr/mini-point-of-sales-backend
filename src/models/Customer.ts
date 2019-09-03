import {
    Sequelize, Model, DataTypes, BuildOptions, 
    HasManyGetAssociationsMixin,
    HasManyAddAssociationMixin,
    HasManyHasAssociationMixin,
    Association,
    HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin,
} from 'sequelize';
import Order from './Order';
import StoreCustomer from './StoreCustomer';

class Customer extends Model {
    public id!: number;
    public mobile!: string;
    public name!: string;

    // timestamp
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public readonly orders: Order[];
    public readonly stores: StoreCustomer[];
}

export default Customer;

// module.exports = (sequelize, DataTypes) => {
//     const Customer = sequelize.define('Customer', {
//         mobile: {
//             type: DataTypes.STRING(20),
//             allowNull: false,
//         },
//         name: {
//             type: DataTypes.STRING(50),
//             allowNull: true,
//         },
//     }, {
//         charset: 'utf8mb4',
//         collate: 'utf8mb4_general_ci',
//     });
//     Customer.associate = db => {
//         db.Customer.hasMany(db.Order);
//         db.Customer.hasMany(db.OrderDetail);
//         db.Customer.hasMany(db.StoreCustomer);
//     };
//     return Customer;
// };
