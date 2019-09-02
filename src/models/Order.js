module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define(
        'Order',
        {
            amounts: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            discount: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
        },
        {
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        },
    );

    Order.associate = db => {
        db.Order.belongsTo(db.Store);

        db.Order.hasMany(db.OrderDetail);
        db.Order.hasMany(db.Payment);
    };

    return Order;
};
