import { PoolClient } from 'pg';
import { Initializeable, Releaseable, IUserInfo } from '../../types';
import { resolve } from 'path';
import { sql } from '../util';

const accountRequests = {
    createaccounttable: sql(resolve(__dirname, './sql/createaccounttable.sql')),
    checkuserexists: sql(resolve(__dirname, './sql/checkuserexists.sql')),
    adduser: sql(resolve(__dirname, './sql/adduser.sql')),
    getuserinfo: sql(resolve(__dirname, './sql/getuserinfo.sql'))
};


export class AccountDBModel implements Initializeable, Releaseable {

    private _client: PoolClient;

    constructor(client: PoolClient) {
        this._client = client;
    }

    async init(): Promise<void> {
        await this._client.query(accountRequests.createaccounttable);
    }

    async checkUserExists(nickname: string): Promise<boolean> {
        const response = await this._client.query(accountRequests.checkuserexists, [ nickname ]);
        return response.rowCount > 0;
    }

    async addUser(nickname: string, passhash: string): Promise<boolean> {
        if (!this.checkUserExists(nickname)) {
            return false;
        }
        await this._client.query(accountRequests.adduser, [ nickname, passhash ]);
        return true;
    }

    async getUserInfo(nickname: string): Promise<IUserInfo | null> {
        const response = await this._client.query<IUserInfo>(accountRequests.getuserinfo, [ nickname ]);
        if (response.rows.length > 0 && response.rows[0]) {
            return response.rows[0];
        }
        return null;
    }

    release(): void {
        this._client.release();
    }

}
