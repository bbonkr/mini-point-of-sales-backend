module.exports = (sequelize, DataTypes) => {
    const StoreAdministration = sequelize.define(
        'StoreAdministration',
        {
            validAt: {
                type: DataTypes.DATETIME,
                allowNull: false,
                defaultValue: false,
            },
        },
        {
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        },
    );

    StoreAdministration.associate = (db) => {
        StoreAdministration.belongsTo(db.User);
        StoreAdministration.belongsTo(db.Store);
    };

    return StoreAdministration;
};
