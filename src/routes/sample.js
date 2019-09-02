const express = require('express');
const passport = require('passport');
const router = express.Router();
const { authJwt, passportJwt } = require('../middleware/auth');

router.get('/', (req, res, next) => {
    try {
        return res.json({
            result: 'ok',
        });
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

router.get('/loggedin', passportJwt, (req, res, next) => {
    try {
        return res.json({
            result: 'ok',
            user: req.user,
        });
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

module.exports = router;
