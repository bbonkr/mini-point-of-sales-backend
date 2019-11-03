import expressSession from 'express-session';
import { Session } from '../entities/Session';
import { IDatabaseSessionStoreOptions } from '../@typings/IDatabaseSessionStoreOptions';
import { getManager, getRepository, Repository } from 'typeorm';

/**
 * Typeorm 을 사용하는 세션 저장소
 * !! Require('typeorm')
 * https://typeorm.io/
 * ```
 * $ npm i typeorm --save
 * ```
 */
export default class DatabaseSessionStore extends expressSession.Store {
    private options: IDatabaseSessionStoreOptions;
    private clearExpiredSessionsInterval: NodeJS.Timeout;
    private sessionRepository: Repository<Session>;

    constructor(config: IDatabaseSessionStoreOptions) {
        super(config);

        const options = {
            expiration:
                config.expiration || 1000 * 60 * 60 * 24 * 120 /** 120 days */,
            clearInterval:
                config.clearInterval || 1000 * 60 * 30 /** 30 minutes */,
        };

        this.options = options;
        this.startClearExpiredSessions();
        this.sessionRepository = getManager().getRepository(Session);
    }

    public destroy = (sid: string, callback?: (err?: any) => void): void => {
        this.sessionRepository
            .findOne({
                where: {
                    sid: sid,
                },
            })
            .then((session) => {
                if (session) {
                    return this.sessionRepository.remove(session);
                }
            })
            .catch((error) => {
                console.error(error);
                if (callback) {
                    callback(error);
                }
            });
    };

    public get = (
        sid: string,
        callback: (err: any, session?: Express.SessionData | null) => void,
    ): void => {
        this.sessionRepository
            .findOne({
                where: { sid: sid },
            })
            .then((session) => {
                if (session) {
                    const now = new Date();
                    const expired = session.expire < now;
                    const err: Error | null = expired
                        ? new Error('Session was expired.')
                        : null;
                    const sessionData: Express.SessionData | null = expired
                        ? null
                        : (JSON.parse(session.sess) as Express.SessionData);

                    console.debug('session: ', expired ? 'expired' : 'valid');

                    if (callback) {
                        callback(err, sessionData);
                    }
                } else {
                    throw new Error('Session does not find.');
                }
            })
            .catch((err) => {
                console.error(err);

                if (callback) {
                    callback(err, null);
                }
            });
    };

    public set = (
        sid: string,
        session: Express.SessionData,
        callback?: (err?: any) => void,
    ): void => {
        const now = new Date();
        const expireMiliseconds = now.setMilliseconds(
            now.getMilliseconds() + this.options.expiration,
        );
        const expire = new Date(expireMiliseconds);

        const newSession = new Session();
        newSession.sid = sid;
        newSession.sess = JSON.stringify(session);
        newSession.expire = expire;

        this.sessionRepository
            .save(newSession)
            .then((_) => {
                console.debug('session created.');
                if (callback) {
                    callback(null);
                }
            })
            .catch((err) => {
                console.error(err);
                if (callback) {
                    callback(err);
                }
            });
    };

    private clearExpiredSessions(): void {
        this.sessionRepository
            .createQueryBuilder('s')
            .where('s.expire < :now', { now: new Date() })
            .getMany()
            .then((sessions) => {
                return Promise.all(
                    sessions.map((s) => {
                        return this.sessionRepository.delete(s);
                    }),
                );
            })
            .then((_) => {
                console.debug(`expired session deleted.`);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    private startClearExpiredSessions(): void {
        this.clearExpiredSessionsInterval = setInterval(
            () => this.clearExpiredSessions.bind(this),
            this.options.clearInterval,
        );
    }
}
