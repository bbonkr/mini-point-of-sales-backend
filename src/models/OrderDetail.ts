import { Model, DataTypes } from 'sequelize';
import Order from './Order';

class OrderDetail extends Model {
    public name!: string;
    public price!: number;
    public quantity!: number;
    public discount!: number;
    public takeout!: boolean;

    // timestamp
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default OrderDetail;

// module.exports = (sequelize, DataTypes) => {
//     const OrderDetail = sequelize.define('OrderDetail', {
//         name: {
//             type: DataTypes.STRING(100),
//             allowNull: false,
//             defaultValue: 0,
//         },
//         price: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             defaultValue: 0,
//         },
//         quantity: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             defaultValue: 0,
//         },
//         discount: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             defaultValue: 0,
//         },
//         takeout: {
//             type: DataTypes.BOOLEAN,
//             allowNull: false,
//             defaultValue: false,
//         },
//     }, {
//         charset: 'utf8mb4',
//         collate: 'utf8mb4_general_ci',
//     });
//     OrderDetail.associate = db => {
//         db.OrderDetail.belongsTo(db.Order);
//         db.OrderDetail.belongsTo(db.Store);
//     };
//     return OrderDetail;
// };
