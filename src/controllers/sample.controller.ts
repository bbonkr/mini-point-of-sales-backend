import express from 'express';
import { ControllerBase } from '../@typings/ControllerBase';
import { authWithJwt } from '../middleware/authWithJwt';
import { JsonResult } from '../@typings/JsonResult';
import { authNeedsManager } from '../middleware/authAsRole';

export default class SampleController extends ControllerBase {
    public getPath(): string {
        return '/api/sample';
    }

    protected initializeRoutes(): void {
        this.router.get('/', this.responseOk);
        this.router.get(
            '/loggedin',
            authWithJwt,
            authNeedsManager,
            this.loggedIn,
        );
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
                        user: req.userInfo,
                    },
                }),
            );
        } catch (e) {
            return next(e);
        }
    }
}
