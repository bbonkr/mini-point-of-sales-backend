const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');
const db = require('../models');

module.exports = () => {
    passport.use(
        new LocalStrategy(
            {
                usernameField: 'username',
                passowrdField: 'password',
                passReqToCallback: true,
                session: false,
            },
            async (req, username, password, done) => {
                try {
                    const user = await db.User.findOne({
                        where: { username: username },
                    });

                    if (!user) {
                        // TODO 시도 횟수 증가
                        // req.connection.remoteAddress
                        return done(null, false, {
                            reason:
                                'Please check your account information and try again. Not exists email in our system.',
                        });
                    }

                    const result = await bcrypt.compare(
                        password,
                        user.password,
                    );

                    if (result) {
                        const transferUser = await db.User.findOne({
                            where: {id: user.id},
                            attributes: ['id', 'username', 'displayName', 'email', 'photo']
                        });

                        return done(null, transferUser);
                    } else {
                        // TODO 시도 횟수 증가
                        return done(null, false, {
                            code: 'ERR-007',
                            reason:
                                'Please check your account info and try again.',
                        });
                    }
                } catch (e) {
                    console.error(e);

                    return done(e);
                }
            },
        ),
    );
};
