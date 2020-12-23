import { PoolClient } from 'pg';
import { Initializeable, Releaseable } from '../../types';
import { resolve } from 'path';
import { sql } from '../util';

const stadiumRequests = {
    createstadiumtable: sql(resolve(__dirname, './sql/createstadiumtable.sql')),
    addstadium: sql(resolve(__dirname, './sql/addstadium.sql'))
};


export class StadiumDBModel implements Initializeable, Releaseable {

    private _client: PoolClient;

    constructor(client: PoolClient) {
        this._client = client;
    }

    async init(): Promise<void> {
        await this._client.query(stadiumRequests.createstadiumtable);
    }

    async addStadium(stadium_name: string, seat_cnt: number, stadium_location: string): Promise<void> {
        await this._client.query(stadiumRequests.addstadium, [ stadium_name, seat_cnt, stadium_location ]);
    }

    release(): void {
        this._client.release();
    }

}
