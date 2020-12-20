import express, { Request, Response, Router } from 'express';
import  path from 'path';

import { apiRouter } from './api';

export const indexRouter = Router();

indexRouter.use('/api', apiRouter);
indexRouter.use(express.static(path.resolve(__dirname, '../../../dist/app')));
indexRouter.get('*', (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, '../../../dist/app/index.html'));
});

