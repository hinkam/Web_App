import express, { Request, Response, Router } from 'express';
import  path from 'path';

import { getAPIRouter } from './api';

export async function getIndexRouter(): Promise<Router> {

    const indexRouter = Router();

    indexRouter.use('/api', await getAPIRouter());
    indexRouter.use(express.static(path.resolve(__dirname, '../../../dist/app')));
    indexRouter.get('*', (req: Request, res: Response) => {
        res.sendFile(path.resolve(__dirname, '../../../dist/app/index.html'));
    });

    return indexRouter;
}


