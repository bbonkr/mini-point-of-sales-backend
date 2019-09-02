module.exports = (sequelize, DataTypes) => {
    const OrderDetail = sequelize.define(
        'OrderDetail',
        {
            name: {
                type: DataTypes.STRING(100),
                allowNull: false,
                defaultValue: 0,
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            discount: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            takeout: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        },
        {
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        },
    );

    OrderDetail.associate = db => {
        db.OrderDetail.belongsTo(db.Order);
        db.OrderDetail.belongsTo(db.Store);
    };

    return OrderDetail;
};
