import express, { Response, NextFunction } from 'express';
import passport from 'passport';
import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { jwtOptions } from '../config/jwtOptions';
import { ControllerBase } from './ControllerBase';
import { HttpStatusError } from '../lib/HttpStatusError';
import { JsonResult } from '../lib/JsonResult';
import { RoleNames } from '../lib/enums/Roles';
import { User } from '../entities/User.entity';
import { Role } from '../entities/Role.entity';
import { getRepository, getManager } from 'typeorm';
import { authWithJwt } from '../middleware/authWithJwt';
import { authNeedsSystem } from '../middleware/authAsRole';

export class AccountController extends ControllerBase {
  public getPath(): string {
    return '/api/account';
  }

  protected initializeRoutes(): void {
    this.router.post('/signin', this.signin.bind(this));
    this.router.post('/signout', this.signout);
    this.router.post('/register', this.register);

    // TODO 제거
    this.router.get(
      '/users',
      authWithJwt,
      authNeedsSystem,
      this.getUsers.bind(this)
    );
  }

  /**
   * 로그인 요청
   * POST: /api/account/signin
   * {
   *      username,
   *      password
   * }
   * @param req
   * @param res
   * @param next
   */
  private async signin(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<any>{
    try {
      const { username, password } = req.body;
      const userRepository = getRepository(User);

      const user = await userRepository.findOne({
          where: { username: username },
          relations: ['roles'],
      });

      if (!user) {
          throw new HttpStatusError({
              code: 401,
              message:
                  'Please check your account information and try again.',
          });
      }

      const result = await bcrypt.compare(password, user.password);

      if (!result) {
          throw new HttpStatusError({
              code: 401,
              message:
                  'Please check your account information and try again.',
          });
      }

      const accessToken = await this.generateToken(user);

      return res.json(
          JsonResult.getSuccess({ accessToken: accessToken }),
      );
  } catch (error) {
      return next(error);
  }
  }

  private signout(
    req: Express.Request,
    res: express.Response,
    next: express.NextFunction
  ): any {
    // const cookieName = process.env.COOKIE_NAME;
    try {
      // req.logout();

      // if (req.session) {
      //     req.session.destroy((err) => {
      //         console.error(err);
      //     });
      // }

      // return res.clearCookie(cookieName).send(
      //     new JsonResult({
      //         success: true,
      //         data: 'logout success.',
      //         message: 'logout success.',
      //     }),
      // );

      return res.send(
        new JsonResult({
          success: true
        })
      );
    } catch (e) {
      console.error(e);
      next(e);
    }
  }

  private async register(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<any> {
    const { username, password, email, displayName } = req.body;
    req.user;
    try {
      if ((username || '').trim().length === 0) {
        throw new HttpStatusError({
          code: 400,
          message: 'Username does not allow empty value.'
        });
      }

      if ((password || '').trim().length === 0) {
        throw new HttpStatusError({
          code: 400,
          message: 'Password does not allow empty value.'
        });
      }

      if ((email || '').trim().length === 0) {
        throw new HttpStatusError({
          code: 400,
          message: 'Email does not allow empty value.'
        });
      }

      if ((displayName || '').trim().length === 0) {
        throw new HttpStatusError({
          code: 400,
          message: 'DisplayName does not allow empty value.'
        });
      }
      const userRepository = getManager().getRepository(User);
      const roleRepository = getManager().getRepository(Role);

      const countUsername = await userRepository.count({
        where: { username: username }
      });

      if (countUsername > 0) {
        throw new HttpStatusError({
          code: 409,
          message: `username ${username} used by other user.`
        });
      }

      const countEmail = await userRepository.count({
        where: { email: email }
      });

      if (countEmail > 0) {
        throw new HttpStatusError({
          code: 409,
          message: `email ${email} used by other user.`
        });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser: User = new User();
      newUser.username = username;
      newUser.displayName = displayName;
      newUser.email = email;
      newUser.password = hashedPassword;

      // TODO send virify email.

      const role = await roleRepository.findOne({
        where: { name: RoleNames.MANAGER }
      });

      if (role) {
        newUser.roles = [role];
      } else {
        throw new HttpStatusError({
          code: 500,
          message: 'Data corrupted. contact system admin'
        });
      }

      await userRepository.save(newUser);

      return res.status(201).json(
        new JsonResult({
          success: true
        })
      );
    } catch (err) {
      return next(err);
    }
  }

  private async getUsers(
    req: Express.Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const userRepository = getRepository(User);

      const users = userRepository
        .createQueryBuilder('user')
        .select(['user.id', 'user.username', 'user.displayName'])
        .getMany();

      return res.json(
        new JsonResult({
          success: true,
          data: users
        })
      );
    } catch (err) {
      return next(err);
    }
  }

  /**
     * 토큰을 작성합니다.
     * @param user 사용자 정보
     */
    private generateToken(user: User): Promise<string> {
      const generateTokenPromise = new Promise<string>((resolve, reject) => {
          jsonwebtoken.sign(
              {
                  _id: user.id,
                  username: user.username,
                  roles: user.roles,
              },
              jwtOptions.secret,
              {
                  // expiresIn: '1m' /* 1분 */,
                  expiresIn: '7d' /* 7일*/,
                  issuer: jwtOptions.issuer,
                  audience: jwtOptions.audience,
                  subject: 'userInfo',
              },
              (err, token) => {
                  if (err) {
                      reject(err);
                  }

                  resolve(token);
              },
          );
      });

      return generateTokenPromise;
  }
}
