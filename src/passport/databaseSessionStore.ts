import expressSession from 'express-session';
import Sequelize from 'sequelize';
// import { db } from '../models'
// import { Sequelize, } from 'sequelize-typescript';
import { sequelize } from '../models';
// const Sequelize = require('sequelize');
import { DatabaseSessionStoreOptions } from './DatabaseSessionStoreOptions'
import { Session } from './Session.model';
const Op = Sequelize.Op;

// const Op = sequelize.Sequelize;

/**
 * Sequelize 를 사용하는 세션 저장소
 * !! Require('sequelize')
 * http://docs.sequelizejs.com/
 * ```
 * $ npm i sequelize --save
 * ```
 */
export default class DatabaseSessionStore extends expressSession.Store {
    constructor (config: DatabaseSessionStoreOptions) {
        const options = {
            expiration:
                config.expiration || 1000 * 60 * 60 * 24 * 120 /** 120 days */,
            clearInterval:
                config.clearInterval || 1000 * 60 * 30 /** 30 minutes */,
        };
        super(options);

        this.options = options;
        this.startClearExpiredSessions();
    }

    options: DatabaseSessionStoreOptions;
    _clearExpiredSessionsInterval: NodeJS.Timeout;

    async destroy (sid, next) {
        try {
            const session = await Session.findOne({
                where: {
                    sid: sid
                }
            });

            await session.destroy();
        } catch (e) {
            console.error(e);
            return next(e);
        }
    }

    async get (sid, next) {
        try {
            const session = await Session.findOne({ where: { sid: sid } });

            if (!session) {
                // new Error('Could not find session')
                return next();
            }

            const now = new Date();
            if (session.expire < now) {
                // new Error('The session has been expired.')
                return next();
            }

            return next(null, JSON.parse(session.sess));
        } catch (e) {
            console.error(e);
            return next(e);
        }
    }

    async set (sid, sess, next) {
        try {
            const expire = new Date().toJSON();

            const newSession = new Session({
                sid: sid,
                sess: JSON.stringify(sess),
                expire: expire,
            });

            await newSession.save();

            return next();
        } catch (e) {
            console.error(e);
            next(e);
        }
    }

    async clearExpiredSessions () {
        await Session.destroy({
            where: {
                expire: {
                    [Op.lte]: new Date()
                },
            },
        });
    }
    
    startClearExpiredSessions () {
        this._clearExpiredSessionsInterval = setInterval(        
            () => this.clearExpiredSessions.bind(this),
            this.options.clearInterval
        );
    }
}


