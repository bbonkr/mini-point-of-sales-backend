import { Model, DataTypes } from 'sequelize';

class Menu extends Model {
    public name!: string;
    public price!: number;
    public image!: string | null;
    public description!: string | null;
    public point!: number;

    // timestamp
    public createdAt!: Date;
    public updatedAt!: Date;
}

export default Menu;



// module.exports = (sequelize, DataTypes) => {
//     const Menu = sequelize.define('Menu', {
//         name: {
//             type: DataTypes.STRING(100),
//             allowNull: false,
//         },
//         price: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//         },
//         image: {
//             type: DataTypes.STRING(500),
//             allowNull: true,
//         },
//         description: {
//             type: DataTypes.TEXT,
//             allowNull: true,
//         },
//         point: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             defaultValue: 0,
//         },
//     }, {
//         charset: 'utf8mb4',
//         collate: 'utf8mb4_general_ci',
//     });
//     Menu.associate = db => {
//         db.Menu.belongsTo(db.Store);
//     };
//     return Menu;
// };
