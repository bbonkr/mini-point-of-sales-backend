const passport = require('passport');

module.exports.passportJwt = (req, res, next) => {
    passport.authenticate('jwt', {session: false}, (err, token, info) => {
        if(info){
            return res.status(400).json({
                code: 'ERR-008',
                message: info.message
            });
        }

        if(err || !token){
            return res.status(401).json({
                code: 'ERR-007',
                message: 'Please log in.',
            });
        }

        return next();
    })(req, res, next);
};
