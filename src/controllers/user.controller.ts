import { ControllerBase } from '../@typings/ControllerBase';
import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entities/User';
import { JsonResult } from '../@typings/JsonResult';
import { HttpStatusError } from '../@typings/HttpStatusError';
import { authWithJwt } from '../middleware/authWithJwt';

export class UserController extends ControllerBase {
    public getPath(): string {
        return '/api/user';
    }

    protected initializeRoutes(): void {
        this.router.get('/', authWithJwt, this.getUser.bind(this));
    }

    /**
     * @swagger
     * /api/user:
     *   get:
     *     security:
     *       - bearerAuth: []
     *     summary: 사용자 정보를 제공합니다.
     *     tags: [User]
     *     responses:
     *       200:
     *         description: user
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
    private async getUser(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const username = req.user.username;

            if (!username) {
                return res.status(400).json(
                    JsonResult.getError(
                        new HttpStatusError({
                            code: 400,
                            message: '잘못된 요청입니다.',
                        }),
                    ),
                );
            }

            const userRepository = getRepository(User);

            const user = await userRepository.findOne(
                { username: username },
                {
                    select: ['id', 'username', 'displayName', 'email', 'photo', 'createdAt'],
                },
            );

            if (!user) {
                return res.status(404).json(
                    JsonResult.getError(
                        new HttpStatusError({
                            code: 404,
                            message: '사용자 정보를 찾을 수 없습니다.',
                        }),
                    ),
                );
            }

            return res.json(JsonResult.getSuccess(user));
        } catch (error) {
            return next(error);
        }
    }

    // private async getUser(req: Request, res: Response, next: NextFunction): Promise<any> {}
}
