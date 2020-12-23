import { Request, Response, Router } from 'express';
import { tournamentAPIController } from '../../controllers';
import { ITournamentQueryDict } from '../../types';

export const tournametsAPIRouter = Router();


tournametsAPIRouter.get('/', async (req: Request, res: Response) => {
    await (await tournamentAPIController()).getAllTournaments(req, res);
});

tournametsAPIRouter.get('/tournament/:tournament_name', async (req: Request<ITournamentQueryDict>, res: Response) => {
    await (await tournamentAPIController()).getTournament(req, res);
});
