import { Request, Response } from 'express';
import { Database, getDataBase } from '../database';

let tournamentAPIController: null | TournamentAPIController = null;

export class TournamentAPIController {
    constructor(database: Database) {
        this._database = database;
    }

    private _database: Database;

    async getAllTournaments(req: Request, res: Response): Promise<void> {
        const tournamentmodel = await this._database.getTournamentDBModel();
        const tournamentinfo = await tournamentmodel.getTournaments();
        if (!tournamentinfo) {
            res.status(404);
            res.send();
        } else {
            res.json(tournamentinfo);
        }
        tournamentmodel.release();
    }

}

export async function getTournamentAPIController(): Promise<TournamentAPIController> {
    if (!tournamentAPIController) {
        tournamentAPIController = new TournamentAPIController(await getDataBase());
    }
    return tournamentAPIController;
}
