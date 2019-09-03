import passport from 'passport';
import local from './local';
import jwt from './jwt';
import { User } from '../models/User.model';

export default () => {
    passport.serializeUser((user: User, done) => {
        console.debug('passport.serializeUser');
        return done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        console.debug('>>>> passport.deserializeUser');
        try {
            const user = await User.findOne({
                where: {
                    id: id,
                },
                attributes: ['id', 'username', 'displayName', 'email', 'photo']
            });

            return done(null, user);
        } catch (e) {
            console.error(e);
            return done(e, null);
        }
    });

    local();

    jwt();
};
