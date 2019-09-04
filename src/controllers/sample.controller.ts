import { ControllerBase } from "../abstractions/ControllerBase";
import express = require("express");
import { passportJwt } from "../middleware/auth";

export default class SampleController extends ControllerBase {

    public getPath(): string {
        return '/api/sample'
    }
    
    protected initializeRoutes(): void {
        this.router.get('/', this.responseOk);
        this.router.get('/loggedin', passportJwt, this.loggedIn);
    }

    private responseOk(req: express.Request, res: express.Response, next: express.NextFunction): any {
        try {
            return res.json({
                result: 'ok',
            });
        } catch (e) {
            console.error(e);
            return next(e);
        }
    }

    private loggedIn(req: express.Request, res: express.Response, next: express.NextFunction): any {
        try {
            return res.json({
                result: 'ok',
                user: req.user,
            });
        } catch (e) {
            console.error(e);
            return next(e);
        }
    }
}