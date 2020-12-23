import { Request, Response, Router } from 'express';
import { IRegister, ILogin } from '../../types';
import { authAPIController } from '../../controllers';

export const authApiRouter = Router();

authApiRouter.post('/register', async (req: Request<unknown, unknown, IRegister>, res: Response) => {
    await (await authAPIController()).register(req, res);
});

authApiRouter.post('/login', async (req: Request<unknown, unknown, ILogin>, res: Response) => {
    await (await authAPIController()).login(req, res);
});
