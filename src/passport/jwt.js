const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const bcrypt = require('bcrypt');
const db = require('../models');
const jwtOptions = require('../config/jwt');

module.exports = () => {
    const options = {
        ... jwtOptions,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: jwtOptions.secret,
        passReqToCallback: true,
    };
    
    const strategy = new Strategy(options, async (req, payload, done) => {
        try {
            done(null, payload, null);
            
        } catch (e) {
            console.error(e);
            done(e, null, {
                code: 'ERR-001',
                message: e
            });
        }
    });
    
    passport.use(strategy);
};