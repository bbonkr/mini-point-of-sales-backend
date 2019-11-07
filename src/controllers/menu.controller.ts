import { ControllerBase } from '../@typings/ControllerBase';
import { authNeedsManager } from '../middleware/authAsRole';
import { authWithJwt } from '../middleware/authWithJwt';
import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { Menu } from '../entities/Menu';
import { JsonResult } from '../@typings/JsonResult';
import { HttpStatusError } from '../@typings/HttpStatusError';
import { Store } from '../entities/Store';

export class MenuController extends ControllerBase {
    public getPath(): string {
        return '/api/store';
    }

    protected initializeRoutes(): void {
        this.router.get('/:store/menu', authWithJwt, authNeedsManager, this.getMenus.bind(this));
        // this.router.get('/:id', authWithJwt, authNeedsManager, this.getStore);
        // this.router.post('/', authWithJwt, authNeedsManager, this.createStore);
        // this.router.patch(
        //     '/:id',
        //     authWithJwt,
        //     authNeedsManager,
        //     this.updateStore,
        // );
        // this.router.delete(
        //     '/:id',
        //     authWithJwt,
        //     authNeedsManager,
        //     this.deleteStore,
        // );
    }

    /**
     * @swagger
     * /api/store/{store}/menu:
     *   get:
     *     security:
     *       - bearerAuth: []
     *     summary: 메뉴 목록 Returns menu list
     *     parameters:
     *       - in: path
     *         name: store
     *         schema:
     *           type: string
     *         required: true
     *         allowReserved: true
     *         description: 매장 식별자
     *       - in: query
     *         name: page
     *         schema:
     *           type: integer
     *         required: false
     *         description: 현재 페이지 Current page of list
     *       - in: query
     *         name: size
     *         schema:
     *           type: integer
     *         required: false
     *         description: 목록에 출력될 항목의 수 Determine items count of list
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
    private async getMenus(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const storeId = decodeURIComponent(req.params.store || '');
            const currentUserId = req.user.id;

            if (!storeId) {
                throw new HttpStatusError({
                    code: 400,
                    message: '유효하지 않은 요청입니다.',
                });
            }

            const page: number = parseInt(req.query.page || '1', 10);
            const pageSize: number = parseInt(req.query.size || '10', 10);

            const skip: number = (page - 1) * pageSize;

            const menuRepository = getRepository(Menu);

            const store = await this.getStore(currentUserId, storeId);
            if (!store) {
                throw new HttpStatusError({ code: 400, message: '유효하지 않은 요청입니다.' });
            }

            const menus = await menuRepository
                .createQueryBuilder('menu')
                .innerJoinAndSelect('menu.store', 'store')
                .where('store.id = :store', { store: store.id })
                .select([
                    'menu.id',
                    'menu.name',
                    'menu.price',
                    'menu.image',
                    'menu.description',
                    'menu.point',
                    'store.id',
                ])
                .orderBy('menu.name', 'ASC')
                .skip(skip)
                .take(pageSize)
                .getMany();

            return res.json(
                new JsonResult({
                    success: true,
                    data: menus,
                }),
            );
        } catch (error) {
            return next(error);
        }
    }

    private async getMenu(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
        } catch (error) {
            return next(error);
        }
    }

    /**
     * 매장 정보를 가져옵니다.
     * @param currentUserId 현재 사용자 식별자
     * @param name 매장 식별자
     */
    private async getStore(currentUserId: string, storeId: string): Promise<Store> {
        const storeRepository = getRepository(Store);

        const store = await storeRepository
            .createQueryBuilder('store')
            .innerJoin('store.administrations', 'admin', 'admin.id = :userId', { userId: currentUserId })
            .where('store.id = :store', { store: storeId })
            .getOne();

        return store;
    }

    /**
     * 메뉴 정보를 가져옵니다.
     * @param storeId 매장 식별자
     * @param menuId 메뉴 식별자
     */
    private async getMenuData(storeId: string, menuId: string): Promise<Menu> {
        const menuRepository = getRepository(Menu);

        const menu = await menuRepository
            .createQueryBuilder('menu')
            .innerJoinAndSelect('menu.store', 'store')
            .select([])
            .where('menu.id = :menuId and store.id = :storeId', { menuId: menuId, storeId: storeId })
            .getOne();

        return menu;
    }
}
