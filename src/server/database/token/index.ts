import { PoolClient } from 'pg';
import { Initializeable, Releaseable } from '../../types';
import { resolve } from 'path';
import { sql } from '../util';

const tokenRequests = {
    createtokentable: sql(resolve(__dirname, './sql/createtokentable.sql')),
    addtoken: sql(resolve(__dirname, './sql/addtoken.sql')),
    deletetoken: sql(resolve(__dirname, './sql/deletetoken.sql'))
};


export class TokenDBModel implements Initializeable, Releaseable {

    private _client: PoolClient;

    constructor(client: PoolClient) {
        this._client = client;
    }

    async init(): Promise<void> {
        await this._client.query(tokenRequests.createtokentable);
    }

    async addtoken(token: string, userID: number): Promise<void> {
        await this._client.query(tokenRequests.addtoken, [ token, userID ]);
    }

    async deletetoken(token: string): Promise<void> {
        await this._client.query(tokenRequests.deletetoken, [ token ]);
    }

    release(): void {
        this._client.release();
    }

}
