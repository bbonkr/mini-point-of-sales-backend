import { Model, DataTypes, Association, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyHasAssociationMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin } from 'sequelize';
import Order from './Order';

class Store extends Model {
    public id!: number;
    public name!: string;
    public businessType!: number;

    // timestamp
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public getOrders!: HasManyGetAssociationsMixin<Order>;
    public addOrder!: HasManyAddAssociationMixin<Order, number>;
    public hasOrder!: HasManyHasAssociationMixin<Order, number>;
    public countOrders!: HasManyCountAssociationsMixin;
    public createOrder!: HasManyCreateAssociationMixin<Order>;
    
    public readonly orders?: Order[];

    public static associations: {
        orders: Association<Store, Order>;
    }
}

export default Store;


// module.exports = (sequelize, DataTypes) => {
//     const Store = sequelize.define('Store', {
//         name: {
//             type: DataTypes.STRING(100),
//             allowNull: false,
//         },
//         businessType: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//         },
//     }, {
//         charset: 'utf8mb4',
//         collate: 'utf8mb4_general_ci',
//     });
//     Store.associate = (db) => {
//         db.Store.hasMany(db.Order);
//         db.Store.hasMany(db.OrderDetail);
//         db.Store.hasMany(db.StoreCustomer);
//         db.Store.hasMany(db.Payment);
//         db.Store.hasMany(db.StoreAdministration);
//     };
//     return Store;
// };
