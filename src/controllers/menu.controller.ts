import { ControllerBase } from '../@typings/ControllerBase';
import { authNeedsManager } from '../middleware/authAsRole';
import { authWithJwt } from '../middleware/authWithJwt';
import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { Menu } from '../entities/Menu';
import { JsonResult } from '../@typings/JsonResult';
import { HttpStatusError } from '../@typings/HttpStatusError';

export class MenuController extends ControllerBase {
    public getPath(): string {
        return '/api/store/:store/menu';
    }

    protected initializeRoutes(): void {
        this.router.get('/', /*authWithJwt, authNeedsManager,*/ this.getMenus);
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

    private async getMenus(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<any> {
        const storeId = req.params.store;

        try {
            if (!storeId) {
                throw new HttpStatusError({
                    code: 400,
                    message: '유효하지 않은 요청입니다.',
                });
            }

            const menuRepository = getRepository(Menu);

            const menus = await menuRepository
                .createQueryBuilder('menu')
                .innerJoin('menu.store', 'store', 'menu.storeId = store.id')
                .where('menu.storeId = :storeId', { storeId: storeId })
                .select([
                    'menu.id',
                    'menu.name',
                    'menu.price',
                    'menu.image',
                    'menu.description',
                    'menu.point',
                    'store.id',
                ])
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
}
