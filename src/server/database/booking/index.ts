import { PoolClient } from 'pg';
import { Initializeable, Releaseable } from '../../types';
import { resolve } from 'path';
import { sql } from '../util';

const bookingRequests = {
    createbookingtable: sql(resolve(__dirname, './sql/createbookingtable.sql')),
    addbooking: sql(resolve(__dirname, './sql/addbooking.sql'))
};


export class BookingDBModel implements Initializeable, Releaseable {

    private _client: PoolClient;

    constructor(client: PoolClient) {
        this._client = client;
    }

    async init(): Promise<void> {
        await this._client.query(bookingRequests.createbookingtable);
    }

    async addBooking(tournamentid: number, seatid: number, price: number): Promise<void> {
        await this._client.query(bookingRequests.addbooking, [ tournamentid, seatid, price ]);
    }

    release(): void {
        this._client.release();
    }

}
