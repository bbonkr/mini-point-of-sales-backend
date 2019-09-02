module.exports = (sequelize, DataTypes) => {
    const Store = sequelize.define(
        'Store',
        {
            name: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            businessType: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        },
    );

    Store.associate = db => {
        db.Store.hasMany(db.Order);
        db.Store.hasMany(db.OrderDetail);
        db.Store.hasMany(db.StoreCustomer);
        db.Store.hasMany(db.Payment);
    };
    
    return Store;
};
