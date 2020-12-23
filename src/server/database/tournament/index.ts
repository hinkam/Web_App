import { PoolClient } from 'pg';
import { Initializeable, Releaseable, ITournamentInfo } from '../../types';
import { resolve } from 'path';
import { sql } from '../util';

const tournamentRequests = {
    createtournamenttable: sql(resolve(__dirname, './sql/createtournamenttable.sql')),
    addtournament: sql(resolve(__dirname, './sql/addtournament.sql')),
    gettournaments: sql(resolve(__dirname, './sql/gettournaments.sql')),
    gettournament: sql(resolve(__dirname, './sql/gettournament.sql'))
};


export class TournamentDBModel implements Initializeable, Releaseable {

    private _client: PoolClient;

    constructor(client: PoolClient) {
        this._client = client;
    }

    async init(): Promise<void> {
        await this._client.query(tournamentRequests.createtournamenttable);
    }

    async addTournament(stadiumid: number, tournament_name: string): Promise<void> {
        await this._client.query(tournamentRequests.addtournament, [ stadiumid, tournament_name]);
    }

    async getTournaments(): Promise<Array<ITournamentInfo> | null> {
        const response = await this._client.query<ITournamentInfo>(tournamentRequests.gettournaments);
        if (response.rows.length > 0 && response.rows[0]) {
            return response.rows;
        }
        return null;
    }

    async getTournament(tournament_name: string): Promise<ITournamentInfo | null> {
        const response = await this._client.query<ITournamentInfo>(tournamentRequests.gettournament, [ tournament_name ]);
        if (response.rows.length > 0 && response.rows[0]) {
            return response.rows[0];
        }
        return null;
    }

    release(): void {
        this._client.release();
    }

}
