import express from 'express';
import { ControllerBase } from './ControllerBase';
import { authWithJwt } from '../middleware/authWithJwt';
import { JsonResult } from '../lib/JsonResult';
import { authNeedsManager } from '../middleware/authAsRole';

export class SampleController extends ControllerBase {
  public getPath(): string {
    return '/api/sample';
  }

  protected initializeRoutes(): void {
    this.router.get('/', this.responseOk);
    this.router.get('/loggedin', authWithJwt, authNeedsManager, this.loggedIn);
  }

  private responseOk(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): any {
    try {
      return res.json(
        new JsonResult({
          success: true,
          data: {
            result: 'ok'
          }
        })
      );
    } catch (e) {
      return next(e);
    }
  }

  private loggedIn(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): any {
    try {
      return res.json(
        new JsonResult({
          success: true,
          data: {
            result: 'ok',
            user: req.user && req.user.username
          }
        })
      );
    } catch (e) {
      return next(e);
    }
  }
}
