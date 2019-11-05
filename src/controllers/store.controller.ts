import { Request, Response, NextFunction } from 'express';
import { ControllerBase } from '../@typings/ControllerBase';
import { authWithJwt } from '../middleware/authWithJwt';
import { JsonResult } from '../@typings/JsonResult';
import { authNeedsManager } from '../middleware/authAsRole';
import { HttpStatusError } from '../@typings/HttpStatusError';
import { BusinessTypes } from '../@typings/enums/BusinessTypes';
import { Store } from '../entities/Store';
import { User } from '../entities/User';
import { getRepository, getManager } from 'typeorm';

export class StoreController extends ControllerBase {
    public getPath(): string {
        return '/api/store';
    }

    protected initializeRoutes(): void {
        this.router.get(
            '/',
            authWithJwt,
            authNeedsManager,
            this.getStores.bind(this),
        );
        this.router.get(
            '/:id',
            authWithJwt,
            authNeedsManager,
            this.getStore.bind(this),
        );
        this.router.post(
            '/',
            authWithJwt,
            authNeedsManager,
            this.createStore.bind(this),
        );
        this.router.patch(
            '/:id',
            authWithJwt,
            authNeedsManager,
            this.updateStore.bind(this),
        );
        this.router.delete(
            '/:id',
            authWithJwt,
            authNeedsManager,
            this.deleteStore.bind(this),
        );

        this.router.patch(
            '/:store/manager',
            authWithJwt,
            authNeedsManager,
            this.addManager.bind(this),
        );
    }

    /**
     * @swagger
     * /api/store:
     *   get:
     *     security:
     *       - bearerAuth: []
     *     summary: Returns stores list
     *     tags: [Stores]
     *     responses:
     *       200:
     *         description: store list
     *         schema:
     *           $ref: '#/components/jsonResult'
     *       400:
     *         $ref: '#/components/res/badRequest'
     *       401:
     *         $ref: '#/components/res/unauthorized'
     *       404:
     *         $ref: '#/components/res/notFound'
     *       500:
     *         $ref: '#/components/res/serverError'
     */
    private async getStores(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<any> {
        /**
         * 관리매장 목록을 가져옵니다.
         * GET: /api/store
         *
         * @param req
         * @param res
         * @param next
         */
        try {
            const userId = req.userInfo.id || 0;

            const storeRepository = getManager().getRepository(Store);
            const stores = await storeRepository
                .createQueryBuilder('store')
                .innerJoinAndSelect(
                    'store.administrations',
                    'administrations',
                    'administrations.id = :userId',
                    {
                        userId: userId,
                    },
                )
                .select([
                    'store.id',
                    'store.name',
                    'store.businessType',
                    'store.validAt',
                    'store.validUntil',
                    'administrations.id',
                    'administrations.username',
                    'administrations.displayName',
                    'administrations.email',
                ])
                .getMany();

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

    private async getStore(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<any> {
        try {
            const userId = req.user.id;
            const storeId = req.params.id;
            console.info('this', this);

            if (userId && storeId) {
                const store = await this.getStoreData(userId, storeId);

                if (store) {
                    return res.json(
                        new JsonResult({
                            success: true,
                            data: store,
                        }),
                    );
                }
            }

            return res.status(400).json(
                new JsonResult({
                    success: false,
                    message: '잘못된 요청입니다.',
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
        req: Request,
        res: Response,
        next: NextFunction,
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

            // const newStore = new Store({
            //     name: name,
            //     businessType: businessType,
            // });

            const storeRepository = getManager().getRepository(Store);

            const newStore = new Store();
            newStore.name = name;
            newStore.businessType = businessType;

            // const addedStore = await newStore.save();
            // await addedStore.$add('users', req.userInfo);
            if (req.userInfo) {
                newStore.administrations = [req.userInfo];
            }
            const savedStore = await storeRepository.save(newStore);

            // const addedStore = await storeRepository
            //     .createQueryBuilder('store')
            //     .innerJoinAndSelect(
            //         'store.administrations',
            //         'administrations',
            //         'administrations.id = :userId',
            //         {
            //             userId: req.user.id,
            //         },
            //     )
            //     .select([
            //         'store.id',
            //         'store.name',
            //         'store.businessType',
            //         'store.validAt',
            //         'store.validUntil',
            //         'administrations.id',
            //         'administrations.username',
            //         'administrations.displayName',
            //         'administrations.email',
            //     ])
            //     .where('store.id = :storeId', { storeId: savedStore.id })
            //     .getOne();

            const addedStore = await this.getStoreData(
                req.user.id,
                savedStore.id,
            );

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
     * 관리 매장 정보를 변경합니다.
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
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<any> {
        try {
            const { id } = req.params;
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

            const storeRepository = getManager().getRepository(Store);
            const foundItem = await storeRepository
                .createQueryBuilder('store')
                .innerJoinAndSelect(
                    'store.administrations',
                    'admin',
                    'admin.id = :userId',
                    {
                        userId: req.userInfo.id,
                    },
                )
                .where('store.id = :storeId', { storeId: id })
                .getOne();

            if (!foundItem) {
                throw new HttpStatusError({
                    code: 404,
                    message: 'Could not find the Store.',
                });
            }

            foundItem.name = name;
            foundItem.businessType = businessType;

            const savedStore = await storeRepository.save(foundItem);

            // const updatedStore = await storeRepository
            //     .createQueryBuilder('store')
            //     .innerJoinAndSelect(
            //         'store.administrations',
            //         'administrations',
            //         'administrations.id = :userId',
            //         {
            //             userId: req.user.id,
            //         },
            //     )
            //     .select([
            //         'store.id',
            //         'store.name',
            //         'store.businessType',
            //         'store.validAt',
            //         'store.validUntil',
            //         'administrations.id',
            //         'administrations.username',
            //         'administrations.displayName',
            //         'administrations.email',
            //     ])
            //     .where('store.id = :storeId', { storeId: savedStore.id })
            //     .getOne();

            const updatedStore = await this.getStoreData(
                req.user.id,
                savedStore.id,
            );

            return res.json(
                new JsonResult({
                    success: true,
                    data: updatedStore,
                }),
            );
        } catch (e) {
            return next(e);
        }
    }

    /**
     * 매장 정보를 삭제합니다.
     * DELETE: /api/store/:id
     *
     * @param req
     * @param res
     * @param next
     */
    private async deleteStore(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<any> {
        try {
            const { id } = req.params;

            const storeRepository = getManager().getRepository(Store);
            const foundItem = await storeRepository
                .createQueryBuilder('store')
                .innerJoin(
                    'store.administrations',
                    'admin',
                    'admin.id = :userId',
                    {
                        userId: req.userInfo.id,
                    },
                )
                .where('store.id = :storeId', { storeId: id })
                .getOne();

            if (!foundItem) {
                throw new HttpStatusError({
                    code: 404,
                    message: 'Could not find a store',
                });
            }

            const deletedIt = foundItem.id;

            // await foundItem.destroy();
            await storeRepository.remove([foundItem]);

            return res.json(
                new JsonResult({
                    success: true,
                    data: deletedIt,
                }),
            );
        } catch (err) {
            return next(err);
        }
    }

    private async addManager(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<any> {
        try {
            const currentUserId: string = req.user.id;
            const storeId: string = req.params.store;
            const addIds: string[] = req.body.add || [];
            const removeIds: string[] = req.body.remove || [];

            if (storeId && addIds.length + removeIds.length) {
                const storeRepository = getRepository(Store);
                const userRepository = getRepository(User);

                const addToUsers: User[] = await Promise.all(
                    addIds.map((id) => {
                        return userRepository.findOne(id);
                    }),
                );

                const removeToUsers: User[] = await Promise.all(
                    removeIds.map((id) => {
                        return userRepository.findOne(id);
                    }),
                );

                const store = await storeRepository
                    .createQueryBuilder('store')
                    .leftJoin('administrators', 'administrator')
                    .where('store.id = :storeId', { storeId: storeId })
                    .getOne();

                if (addToUsers) {
                    store.administrations = [
                        ...store.administrations,
                        ...addToUsers,
                    ];
                }

                if (removeToUsers) {
                    store.administrations = store.administrations.filter((v) =>
                        removeToUsers.includes(v),
                    );
                }

                await storeRepository.save(store);

                const updatedStore = await this.getStoreData(
                    currentUserId,
                    storeId,
                );

                return res.json(
                    new JsonResult({
                        success: true,
                        data: updatedStore,
                    }),
                );
            }
        } catch (err) {
            return next(err);
        }
    }

    private async applicationToUse(
        req: Request,
        res: Response,
        next: NextFunction,
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
        req: Request,
        res: Response,
        next: NextFunction,
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
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<any> {
        try {
            // 신청 :( 모델이 없음!
        } catch (e) {
            return next(e);
        }
    }

    /**
     * 매장 정보
     * @param userId 사용자 식별자
     * @param storeId 매장 식별자
     */
    private async getStoreData(
        userId: string,
        storeId: string,
    ): Promise<Store> {
        const storeRepository = getRepository(Store);
        const store = await storeRepository
            .createQueryBuilder('store')
            .innerJoinAndSelect(
                'store.administrations',
                'administrations',
                'administrations.id = :userId',
                {
                    userId: userId,
                },
            )
            .select([
                'store.id',
                'store.name',
                'store.businessType',
                'store.validAt',
                'store.validUntil',
                'administrations.id',
                'administrations.username',
                'administrations.displayName',
                'administrations.email',
            ])
            .where('store.id = :storeId', { storeId: storeId })
            .getOne();

        return store;
    }
}
