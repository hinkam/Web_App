import { Request, Response } from 'express';
import { Database, getDataBase } from '../database';
import { IRegister, ILogin } from '../types';
import { hash, compare } from 'bcrypt';

let authAPIController: null | AuthAPIController = null;

export class AuthAPIController {
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
        const tokenmodel = await this._database.getTokenDBModel();
        const userInfo = await usermodel.getUserInfo(req.body.nickname);
        if (!userInfo) {
            res.status(400);
            res.send();
        } else {
            if (await compare(req.body.password, userInfo.pwhash)) {
                const generatedToken = await hash((Math.random() * (10 ** 9)).toString(), 10);
                await tokenmodel.addtoken(generatedToken, userInfo.userid);
                res.cookie('access_token', generatedToken, { httpOnly: true });
                res.send();
                return;
            }
            res.status(400);
            res.send();
        }
        usermodel.release();
    }
}

export async function getAuthAPIController(): Promise<AuthAPIController> {
    if (!authAPIController) {
        authAPIController = new AuthAPIController(await getDataBase());
    }
    return authAPIController;
}
