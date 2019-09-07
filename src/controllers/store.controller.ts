import { ControllerBase } from '../@typings/ControllerBase';
import express = require('express');
import { passportJwt } from '../middleware/auth';
import { JsonResult } from '../@typings/JsonResult';
import { Store } from '../models/Store.model';
import { User } from '../models/User.model';

export default class StoreController extends ControllerBase {
    public getPath(): string {
        return '/api/store';
    }

    protected initializeRoutes(): void {
        this.router.get('/', passportJwt, this.getStores);
        this.router.post('/', passportJwt, this.createStore);
    }

    /**
     * 관리매장 목록을 가져옵니다.
     * GET: /api/store
     *
     * @param req
     * @param res
     * @param next
     */
    private async getStores(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
    ): Promise<any> {
        try {
            const userId = (req.user as User).id || 0;

            const stores = await Store.findAll({
                where: {},
                include: [
                    {
                        model: User,
                        as: 'users',
                        where: {
                            id: userId,
                        },
                        attributes: ['id'],
                    },
                ],
            });

            return res.json(
                new JsonResult({
                    success: true,
                    data: stores,
                }),
            );
        } catch (e) {
            console.error(e);
            return next(e);
        }
    }

    /**
     * 관리 매장을 추가합니다.
     * POST: /api/store
     * {
     *      name: string,
     *      businessType: BusinessTypes
     * }
     *
     * @param req
     * @param res
     * @param next
     */
    private async createStore(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
    ): Promise<any> {
        try {
            const { name, businessType } = req.body;

            const newStore = new Store({
                name: name,
                businessType: businessType,
            });

            const addedStore = await newStore.save();
            await addedStore.$add('users', req.user as User);

            return res.json(
                new JsonResult({
                    success: true,
                    data: addedStore,
                }),
            );
        } catch (e) {
            console.error(e);
            return next(e);
        }
    }

    private async applicationToUse(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
    ): Promise<any> {
        try {
            // 신청 :( 모델이 없음!
        } catch (e) {
            console.error(e);
            return next(e);
        }
    }

    /**
     * 사용 신청을 승인합니다.
     * @param req
     * @param res
     * @param next
     */
    private async approveToUse(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
    ): Promise<any> {
        try {
            // 신청 :( 모델이 없음!
        } catch (e) {
            console.error(e);
            return next(e);
        }
    }

    /**
     * 사용 신청을 거부합니다.
     * @param req
     * @param res
     * @param next
     */
    private async rejectToUse(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
    ): Promise<any> {
        try {
            // 신청 :( 모델이 없음!
        } catch (e) {
            console.error(e);
            return next(e);
        }
    }
}
