module.exports = (sequelize, DataTypes) => {
    const StoreCustomer = sequelize.define(
        'StoreCustomer',
        {
            point: {
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

    StoreCustomer.associate = db => {
        db.StoreCustomer.belongsTo(db.Store);
        db.StoreCustomer.belongsTo(db.Customer);
        db.StoreCustomer.belongsTo(db.Payment);
    };

    return StoreCustomer;
};
