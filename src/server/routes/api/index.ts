import { Request, Response, Router } from 'express';
import { authApiRouter } from './auth';
import { tournamentAPIController } from '../../controllers';

export const apiRouter = Router();

apiRouter.use('/auth', authApiRouter);

apiRouter.get('/', (req: Request, res: Response) => {
    res.send('Hello');
});

apiRouter.get('/tournams', async (req: Request, res: Response) => {
    await (await tournamentAPIController()).getAllTournaments(req, res);
});
