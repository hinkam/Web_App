import { Request, Response, Router } from 'express';
import { authMiddleware } from '../../controllers';
import { authApiRouter } from './auth';
import { tournametsAPIRouter } from './tournaments';
import { userApiRouter } from './user';

export async function getAPIRouter(): Promise<Router> {

    const apiRouter = Router();

    apiRouter.use('/auth', authApiRouter);

    apiRouter.use('/tournams', tournametsAPIRouter);

    apiRouter.use('/user', (await authMiddleware()).middleware);

    apiRouter.use('/user', userApiRouter);

    apiRouter.get('/', (req: Request, res: Response) => {
        res.send('Hello');
    });

    return apiRouter;

}

