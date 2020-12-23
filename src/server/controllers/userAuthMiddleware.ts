import { Request, Response } from 'express';
import { Database, getDataBase } from '../database';
import { IRegister, ILogin } from '../types';
import { hash } from 'bcrypt';

let userAuthMiddleware: null | UserAuthMiddleware = null;

export class UserAuthMiddleware {
    constructor(database: Database) {
        this._database = database;
    }

    private _database: Database;

    async register(req: Request<unknown, unknown, IRegister>, res: Response): Promise<void> {
        const usermodel = await this._database.getAccountDBModel();
        const passhash = await hash( req.body.password, 8 );
        if (await usermodel.addUser(req.body.nickname, passhash)) {
            res.send();
        } else {
            res.status(400);
            res.send();
        }
        usermodel.release();
    }

    async login(req: Request<unknown, unknown, ILogin>, res: Response): Promise<void> {
        const usermodel = await this._database.getAccountDBModel();
    }
}

export async function getUserAuthMiddleware(): Promise<UserAuthMiddleware> {
    if (!userAuthMiddleware) {
        userAuthMiddleware = new UserAuthMiddleware(await getDataBase());
    }
    return userAuthMiddleware;
}
