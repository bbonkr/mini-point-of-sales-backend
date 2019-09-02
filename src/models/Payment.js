module.exports = (sequelize, DataTypes) => {
    const Payment = sequelize.define(
        'Payment',
        {
            orderAmounts: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            point: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            Amounts: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            value: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            tax: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            payMethod: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            installment: {
                type: DataTypes.installment,
                allowNull: false,
                defaultValue: 0,
            },
            isCancelled: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValeu: false,
            },
        },
        {
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        },
    );

    Payment.associate = db => {
        db.Payment.belongsTo(db.Store);
        db.Payment.belongsTo(db.Order);

        // TODO 필요할까?
        // db.Payment.hasMany(db.StoreCustomer);
    };

    return Payment;
};
