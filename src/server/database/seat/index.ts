import { PoolClient } from 'pg';
import { Initializeable, Releaseable } from '../../types';
import { resolve } from 'path';
import { sql } from '../util';

const seatRequests = {
    createseattable: sql(resolve(__dirname, './sql/createseattable.sql')),
    addseat: sql(resolve(__dirname, './sql/addseat.sql'))
};


export class SeatDBModel implements Initializeable, Releaseable {

    private _client: PoolClient;

    constructor(client: PoolClient) {
        this._client = client;
    }

    async init(): Promise<void> {
        await this._client.query(seatRequests.createseattable);
    }

    async addSeat(stadiumid: number, seat_row: number, seat_number: number): Promise<void> {
        await this._client.query(seatRequests.addseat, [ stadiumid, seat_row, seat_number ]);
    }

    release(): void {
        this._client.release();
    }

}
