import { PoolClient } from 'pg';
import { Initializeable, Releaseable } from '../../types';
import { resolve } from 'path';
import { sql } from '../util';

const ticketRequests = {
    createtickettable: sql(resolve(__dirname, './sql/createtickettable.sql')),
    addticket: sql(resolve(__dirname, './sql/addticket.sql'))
};


export class TicketDBModel implements Initializeable, Releaseable {

    private _client: PoolClient;

    constructor(client: PoolClient) {
        this._client = client;
    }

    async init(): Promise<void> {
        await this._client.query(ticketRequests.createtickettable);
    }

    async addTicket(userid: number, bookingid: number): Promise<void> {
        await this._client.query(ticketRequests.addticket, [ userid, bookingid ]);
    }

    release(): void {
        this._client.release();
    }

}
