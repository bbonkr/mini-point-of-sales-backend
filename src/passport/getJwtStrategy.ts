import express from 'express';
import passport from 'passport';
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { jwtOptions } from '../config/jwtOptions';
import { IVerifyOptions } from 'passport-local';
import { User } from '../entities/User.entity';
import { getRepository } from 'typeorm';
import { HttpStatusError } from '../lib/HttpStatusError';

export const getJwtStrategy = () => {
  const options: StrategyOptions = {
    issuer: jwtOptions.issuer,
    audience: jwtOptions.audience,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtOptions.secret,
    passReqToCallback: true
  };
  const userRepository = getRepository(User);

  const strategy = new Strategy(
    options,
    async (
      req: express.Request,
      payload: any,
      done: (error: any, user?: any, options?: IVerifyOptions) => void
    ) => {
      try {
        const { username } = payload;

        const user = await userRepository.findOne({
          where: { username: username },
          select: ['id', 'username', 'email', 'displayName'],
          relations: ['roles', 'stores']
        });

        if (!user) {
          throw new HttpStatusError({
            code: 401,
            message: 'Could not find a account information.'
          });
        }

        done(null, user);
      } catch (e) {
        console.error(e);
        done(e, null, {
          message: e.message
        });
      }
    }
  );

  return strategy;
};
