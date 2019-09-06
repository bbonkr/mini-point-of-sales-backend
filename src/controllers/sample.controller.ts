import { ControllerBase } from '../@typings/ControllerBase';
import express = require('express');
import { passportJwt } from '../middleware/auth';
import { JsonResult } from '../@typings/JsonResult';

export default class SampleController extends ControllerBase {
    public getPath(): string {
        return '/api/sample';
    }

    protected initializeRoutes(): void {
        this.router.get('/', this.responseOk);
        this.router.get('/loggedin', passportJwt, this.loggedIn);
    }

    private responseOk(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
    ): any {
        try {
            return res.json(
                new JsonResult({
                    success: true,
                    data: {
                        result: 'ok',
                    },
                }),
            );
        } catch (e) {
            console.error(e);
            return next(e);
        }
    }

    private loggedIn(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
    ): any {
        try {
            return res.json(
                new JsonResult({
                    success: true,
                    data: {
                        result: 'ok',
                        user: req.user,
                    },
                }),
            );
        } catch (e) {
            console.error(e);
            return next(e);
        }
    }
}
