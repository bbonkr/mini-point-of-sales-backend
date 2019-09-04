module.exports = (sequelize, DataTypes) => {
    const StoreAdministration = sequelize.define(
        'StoreAdministration',
        {
            // DataTypes.DATE:
            // https://sequelize.org/master/class/lib/data-types.js~DATE.html
            // 밀리세컨드 저장
            validAt:{
                type: DataTypes.DATE,
                allowNull: false,
            },
            validUntil: {
                type: DataTypes.DATE,
                allowNull: false,
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
