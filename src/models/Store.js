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

    };
    
    return Store;
};
