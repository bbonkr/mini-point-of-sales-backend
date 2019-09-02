const express = require('express');
const passport = require('passport');
const db = require('../models');
const router = express.Router();

const defaultUserAttributes = [
    'id',
    'email',
    'username',
    'displayName',
    'photo',
    'isEmailConfirmed',
];

const findUserById = async (id) => {
    const me = await db.User.findOne({
        where: {
            id: id,
        },
        include: [
            {
                model: db.StoreAdministration,
                attributes: ['id'],
            },
        ],
        attributes: defaultUserAttributes,
    });

    return me;
};

/**
 * 로그인
 */
router.post('/signin', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error(err);
            next(err);
        }

        if (info) {
            return res.status(401).send(info.reason);
        }

        // req.login 실행시 passport.serialize 실행
        return req.login(user, async loginErr => {
            if (loginErr) {
                return next(loginErr);
            }

            try {
                // const user = await findUserById(user.id);

                return res.json(user);
            } catch (e) {
                console.error(e);
                return next(e);
            }
        });
    })(req, res, next);
});

/**
 * 로그아웃
 */
router.post('/signout', (req, res, next) => {
    const cookieName = process.env.COOKIE_NAME;
    try {
        req.logout();
        req.session && req.session.destroy();
        return res.clearCookie(cookieName).send('logout success.');
    } catch (e) {
        console.error(e);
        next(e);
    }
});

module.exports = router;
