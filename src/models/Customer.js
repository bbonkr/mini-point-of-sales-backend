module.exports = (sequelize, DataTypes) => {
    const Customer = sequelize.define(
        'Customer',
        {
            mobile: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
        },
        {
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        },
    );

    Customer.associate = db => {
        db.Customer.hasMany(db.Order);
        db.Customer.hasMany(db.OrderDetail);
        db.Customer.hasMany(db.StoreCustomer);
    };

    return Customer;
};
