import { Request, Response, Router } from 'express';

export const apiRouter = Router();

apiRouter.get('/', (req: Request, res: Response) => {
    res.send('Hello');
});
