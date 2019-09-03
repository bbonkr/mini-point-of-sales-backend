// const express = require('express');
import express from 'express';
import { sequelize } from './models';
// const db = require('./models');
// const morgan = require('morgan');
import morgan from 'morgan';
import cors from 'cors'; 
// const cors = require('cors');
import cookieParser from 'cookie-parser';
// const cookieParser = require('cookie-parser');
// const expressSession = require('express-session');
import expressSession from 'express-session';
import passport from 'passport';
// const passport = require('passport');
// const passportConfig = require('./passport');
import passportConfig from './passport';
// const dotenv = require('dotenv');
import dotenv from 'dotenv';
// const DatabaseSessionStore = require('./passport/databaseSessionStore');
import DatabaseSessionStore from './passport/databaseSessionStore';
import { jwtOptions } from './config/jwt';
import { DatabaseSessionStoreOptions } from './passport/DatabaseSessionStoreOptions';
// const jwtOptions = require('./config/jwt');

const app = express();

dotenv.config();

const port = parseInt(process.env.PORT || '3000', 10);
const host = process.env.HOST || 'localhost';
const protocol = process.env.PROTOCOL || 'http';

const dev = process.env.NODE_ENV !== 'production';
const prod = process.env.NODE_ENV === 'production';

const cookieName = process.env.COOKIE_NAME;

// logging
app.use(morgan('dev'));

sequelize.sync({
    // If force is true, each Model will run DROP TABLE IF EXISTS,
    // before it tries to create its own table
    force: false,
});



passportConfig();

const dbSessionStore = new DatabaseSessionStore(<DatabaseSessionStoreOptions>{
    // database: sequelize,
    expiration: 1000 * 60 * 60 * 24 * 90,
});

// form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', express.static('uploads'));

app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    }),
);
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
    expressSession({
        name: cookieName,
        resave: false,
        saveUninitialized: false,
        secret: process.env.COOKIE_SECRET,
        cookie: {
            httpOnly: true,
            secure: false, // https 사용시 true
        },
        store: dbSessionStore,
    }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', require('./routes'));

app.get('*', (req: express.Request, res: express.Response) => {
    res.send('Hello');
});

// seed data
// const { seed } = require('./config/seed');
// seed();

app.listen(port, () => {
    console.log(`server is running on ${protocol}://${host}:${port}`);
});
