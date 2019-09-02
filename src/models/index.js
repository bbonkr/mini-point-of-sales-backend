const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        config,
    );
}

db.User = require('./User')(sequelize, Sequelize);
db.Store = require('./Store')(sequelize, Sequelize);
db.Customer = require('./Customer')(sequelize, Sequelize);
db.Menu = require('./Menu')(sequelize, Sequelize);
db.Order = require('./Order')(sequelize, Sequelize);
db.OrderDetail = require('./OrderDetail')(sequelize, Sequelize);
db.Payment = require('./Payment')(sequelize, Sequelize);
db.StoreCustomer = require('./StoreCustomer')(sequelize, Sequelize);
db.StoreAdministration = require('./StoreAdminitration')(sequelize, Sequelize);

/**
 * passport store
 */
db.Session = require('../passport/session')(sequelize, Sequelize);

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
