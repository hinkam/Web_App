import { Request, Response, Router } from 'express';

export const userApiRouter = Router();

userApiRouter.get('/', (req: Request, res: Response) => {
    console.log('this is userAPI');
    res.json({ userName: res.locals.userName });
});

