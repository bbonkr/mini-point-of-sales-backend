import { ControllerBase } from '../@typings/ControllerBase';
import express = require('express');
import { authWithJwt } from '../middleware/authWithJwt';
import { JsonResult } from '../@typings/JsonResult';
import { Store } from '../models/Store.model';
import { User } from '../models/User.model';
import { authNeedsManager } from '../middleware/authAsRole';
import { HttpStatusError } from '../@typings/HttpStatusError';
import { BusinessTypes } from '../@typings/enums/BusinessTypes';

export default class StoreController extends ControllerBase {
    public getPath(): string {
        return '/api/store';
    }

    protected initializeRoutes(): void {
        this.router.get('/', authWithJwt, authNeedsManager, this.getStores);
        this.router.post('/', authWithJwt, authNeedsManager, this.createStore);
        this.router.patch(
            '/:id',
            authWithJwt,
            authNeedsManager,
            this.updateStore,
        );
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

            if ((name || '').trim().length === 0) {
                throw new HttpStatusError({
                    code: 400,
                    message: 'Store name does not allow empty value.',
                });
            }

            if (!Object.values(BusinessTypes).includes(businessType || 0)) {
                throw new HttpStatusError({
                    code: 400,
                    message: `BusinessType name does not allow [${businessType}].`,
                });
            }

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
            next(e);
        }
    }

    /**
     * 관리 매장을 추가합니다.
     * PATCH: /api/store/:id
     * {
     *      name: string,
     *      businessType: BusinessTypes
     * }
     *
     * @param req
     * @param res
     * @param next
     */
    private async updateStore(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
    ): Promise<any> {
        try {
            const { id } = req.params;
            const { name, businessType } = req.body;

            const foundItem = await Store.findOne({
                where: {
                    id: id,
                },
            });

            if ((name || '').trim().length === 0) {
                throw new HttpStatusError({
                    code: 400,
                    message: 'Store name does not allow empty value.',
                });
            }

            if (!Object.values(BusinessTypes).includes(businessType || 0)) {
                throw new HttpStatusError({
                    code: 400,
                    message: `BusinessType name does not allow [${businessType}].`,
                });
            }

            if (!foundItem) {
                throw new HttpStatusError({
                    code: 404,
                    message: 'Could not find the Store.',
                });
            }

            foundItem.name = name;
            foundItem.businessType = businessType;

            const updatedItem = await foundItem.save();

            return res.json(
                new JsonResult({
                    success: true,
                    data: updatedItem,
                }),
            );
        } catch (e) {
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
            return next(e);
        }
    }
}
