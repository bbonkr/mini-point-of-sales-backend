import express, { Router } from 'express';
import passport from 'passport';
import { passportJwt } from '../middleware/auth';

// const express = require('express');
// const passport = require('passport');
// const { authJwt, passportJwt } = require('../middleware/auth');

const router: Router = express.Router();

router.get('/', (req: express.Request, res: express.Response, next: any) => {
    try {
        return res.json({
            result: 'ok',
        });
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

router.get('/loggedin', passportJwt, (req: express.Request, res: express.Response, next: any) => {
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

export default router;
// module.exports = router;
