const passport = require('passport');
const db = require('../models');
const local = require('./local');
const jwt = require('./jwt');

module.exports = () => {
    passport.serializeUser((user, done) => {
        console.debug('passport.serializeUser');
        return done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        console.debug('>>>> passport.deserializeUser');
        try {
            const user = await db.User.findOne({
                where: {
                    id: id,
                },
                attributes: ['id', 'username', 'displayName', 'email', 'photo']
            });

            return done(null, user);
        } catch (e) {
            console.error(e);
            return done(e, null);
        }
    });

    local();

    jwt();
};
