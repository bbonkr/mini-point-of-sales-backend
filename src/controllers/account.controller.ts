import express = require("express");
import passport = require("passport");
import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { IControllerBase } from "../abstractions/IControllerBase";
import { jwtOptions } from "../config/jwt";
import { SessionRequest } from "../abstractions/SessionRequest";
import { ControllerBase } from "../abstractions/ControllerBase";
import { User } from "../models/User.model";
import { JsonResult } from "./JsonResult";
import { HttpStatusError } from "../abstractions/HttpStatusError";

export default class AccountController extends ControllerBase {

    public getPath(): string {
        return "/api/account";
    }

    protected initializeRoutes(): void{
        this.router.post('/signin', this.signin);
        this.router.post('/signout', this.signout);
        this.router.post('/register', this.register);
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
    private signin(req: express.Request, res: express.Response, next: express.NextFunction): any {
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
    }

    private signout(req: SessionRequest, res: express.Response, next: express.NextFunction): any {
        const cookieName = process.env.COOKIE_NAME;
        try {
            req.logout();
            
            req.session && req.session.destroy((err)=>console.error(err));
    
            return res.clearCookie(cookieName).send('logout success.');
        } catch (e) {
            console.error(e);
            next(e);
        }
    }

    private register(req: SessionRequest, res: express.Response, next: express.NextFunction): any {
        
        const { username, password, email, displayName } = req.body;

        try {
            if((username || '').trim().length === 0){
                // return res.status(400)
                // .json(JsonResult.getErrorResult(new Error(`Username does not allow empty value.`)));
                throw new HttpStatusError(400, `Username does not allow empty value.`);
            }
    
            if((password || '').trim().length === 0){
                // return res.status(400)
                // .json(JsonResult.getErrorResult(new Error(`Password does not allow empty value.`)));
                throw new HttpStatusError(400, `Password does not allow empty value.`);
            }
    
            if((email || '').trim().length === 0){
                // return res.status(400)
                // .json(JsonResult.getErrorResult(new Error(`Email does not allow empty value.`)));
                throw new HttpStatusError(400, `Email does not allow empty value.`);
            }
    
            if((displayName || '').trim().length === 0){
                // return res.status(400)
                // .json(JsonResult.getErrorResult(new Error(`DisplayName does not allow empty value.`)));
                throw new HttpStatusError(400, `DisplayName does not allow empty value.`);
            }
        } catch (err) {
            let httpStatusError: HttpStatusError; 
            if(err instanceof HttpStatusError){
                httpStatusError = <HttpStatusError>err
            }
            else{
                httpStatusError = new HttpStatusError(500);              
            }

            return res.status(httpStatusError.code)
            .json(JsonResult.getErrorResult(new Error(httpStatusError.message)));
        }

        User.findAndCountAll({
            where: {
                username: username
            }
        })
        .then(({count, rows}) => {
            if(count > 0){
                // return res.status(409).json(JsonResult.getErrorResult(new Error(`username ${username} used by other user.`)));
                throw new HttpStatusError(409, `username ${username} used by other user.`);
            }
        })
        .then(_=>{
            return User.findAndCountAll({
                where: {
                    email: email
                }
            });
        })
        .then(({count, rows}) => {
            if(count > 0){
                // return res.status(409).json(JsonResult.getErrorResult(new Error(`email ${email} used by other user.`)));
                throw new HttpStatusError(409, `email ${email} used by other user.`);
            }
        })
        .then(_ => {
            return bcrypt.hash(password, 12);
        })
        .then((hashedPassword) => {
            const newUser = new User({
                username: username,
                password: hashedPassword,
                email: email,
                displayName: displayName,
            });

            return newUser.save();
        })
        .then(user => {
            delete user.password;

            return res.status(201).json(user);
        })
        .catch((err: Error) => {
            console.error(err);
            if ( err instanceof HttpStatusError){
                const httpStatusError = <HttpStatusError>err;
                return res.status(httpStatusError.code).json(JsonResult.getErrorResult(new Error(httpStatusError.message)));
            }
            else{
                return next(err);    
            }
        });
    }
}