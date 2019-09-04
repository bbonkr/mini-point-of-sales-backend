import express, { Router } from 'express';
import expressSession from 'express-session';
import passport from 'passport';
import jsonwebtoken from 'jsonwebtoken';
import { jwtOptions } from '../config/jwt';
import { User } from '../models/User.model';
import { StoreAdministration } from '../models/StoreAdministration.model';

type SessionRequest = express.Request & {
    session?: Express.Session;
    sessionID?: string;
};

const router: Router = express.Router();

const defaultUserAttributes: Array<string>= [
    'id',
    'email',
    'username',
    'displayName',
    'photo',
    'isEmailConfirmed',
];

const findUserById = async (id) => {
    const me = await User.findOne({
        where: {
            id: id,
        },
        include: [StoreAdministration],
        attributes: defaultUserAttributes,
    });

    return me;
};

/**
 * 로그인
 */
router.post('/signin', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error(err);
            next(err);
        }

        if (info) {
            return res.status(401).send(info.reason);
        }

        // req.login 실행시 passport.serialize 실행
        return req.login(user, { session: false }, async loginErr => {
            if (loginErr) {
                return next(loginErr);
            }

            try {
                // const user = await findUserById(user.id);
                const signOptions = {
                    expiresIn: '7d',
                    issuer: jwtOptions.issuer,
                    audience: jwtOptions.audience,
                    subject: 'userInfo'
                };
                
                const payload = {
                    id: user.id,
                    username: user.username,
                    displayName: user.displayName,
                    email: user.email,
                };
                const token = jsonwebtoken.sign(
                    payload, 
                    jwtOptions.secret, 
                    signOptions);

                return res.json({ user, token });
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
router.post('/signout', (req: SessionRequest, res: express.Response, next: express.NextFunction) => {
    const cookieName = process.env.COOKIE_NAME;
    try {
        req.logout();
        
        req.session && req.session.destroy((err)=>console.error(err));

        return res.clearCookie(cookieName).send('logout success.');
    } catch (e) {
        console.error(e);
        next(e);
    }
});

export default router;
