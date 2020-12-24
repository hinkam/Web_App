import { Request, Response, Router } from 'express';

export const userApiRouter = Router();

userApiRouter.get('/', (req: Request, res: Response) => {
    res.json({ userName: res.locals.userName });
});

