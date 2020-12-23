import { Request, Response } from 'express';
import { Database, getDataBase } from '../database';
import { ITournamentQueryDict } from '../types';

let tournamentAPIController: null | TournamentAPIController = null;

export class TournamentAPIController {
    constructor(database: Database) {
        this._database = database;
    }

    private _database: Database;

    async getAllTournaments(req: Request, res: Response): Promise<void> {
        const tournamentmodel = await this._database.getTournamentDBModel();
        const tournamentsinfo = await tournamentmodel.getTournaments();
        if (!tournamentsinfo) {
            res.status(404);
            res.send();
        } else {
            res.json(tournamentsinfo);
        }
        tournamentmodel.release();
    }

    async getTournament(req: Request<ITournamentQueryDict>, res: Response): Promise<void> {
        const tournamentmodel = await this._database.getTournamentDBModel();
        const tournamentinfo = await tournamentmodel.getTournament(req.params.tournament_name);
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
