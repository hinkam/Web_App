import { Request, Response } from 'express';
import { Database, getDataBase } from '../database';

let authMiddleware: null | AuthMiddleware = null;

export class AuthMiddleware {
    constructor(database: Database) {
        this._database = database;
        this.middleware = this.middleware.bind(this);
    }

    private _database: Database;

    async middleware(req: Request, res: Response, next: () => void): Promise<void> {
        const cookie = req.cookies as {access_token? : string};
        if (cookie.access_token && cookie.access_token.length > 0) {
            console.log(cookie.access_token);
            const usermodel = await this._database.getAccountDBModel();
            const userName = await usermodel.getUserByToken(cookie.access_token);
            if (!userName) {
                res.status(401);
                res.send();
            } else {
                res.locals.userName = userName;
                next();
            }
            usermodel.release();
        }
    }
}

export async function getAuthMiddleware(): Promise<AuthMiddleware> {
    if (!authMiddleware) {
        authMiddleware = new AuthMiddleware(await getDataBase());
    }
    return authMiddleware;
}
