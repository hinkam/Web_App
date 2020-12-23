import { Pool } from 'pg';
import { TokenDBModel } from './token';
import { AccountDBModel } from './account';
import { StadiumDBModel } from './stadium';
import { SeatDBModel } from './seat';
import { TournamentDBModel } from './tournament';
import { BookingDBModel } from './booking';
import { TicketDBModel } from './ticket';
import { Initializeable, Releaseable } from '../types';

let database: null | Database = null;

export class Database implements Initializeable {
    constructor() {
        this._pool = new Pool();
    }

    async init(): Promise<void> {
        const modelsArr: Array<Releaseable> = [ ];
        modelsArr.push(await this.getAccountDBModel());
        modelsArr.push(await this.getTokenDBModel());
        modelsArr.push(await this.getStadiumDBModel());
        modelsArr.push(await this.getSeatDBModel());
        modelsArr.push(await this.getTournamentDBModel());
        modelsArr.push(await this.getBookingDBModel());
        modelsArr.push(await this.getTicketDBModel());

        for (const model of modelsArr) {
            model.release();
        }
    }

    async getAccountDBModel(): Promise<AccountDBModel> {
        const accountModel = new AccountDBModel(await this._pool.connect());
        await accountModel.init();
        return accountModel;
    }

    async getTokenDBModel(): Promise<TokenDBModel> {
        const tokenModel = new TokenDBModel(await this._pool.connect());
        await tokenModel.init();
        return tokenModel;
    }

    async getStadiumDBModel(): Promise<StadiumDBModel> {
        const stadiumModel = new StadiumDBModel(await this._pool.connect());
        await stadiumModel.init();
        return stadiumModel;
    }

    async getSeatDBModel(): Promise<SeatDBModel> {
        const seatModel = new SeatDBModel(await this._pool.connect());
        await seatModel.init();
        return seatModel;
    }

    async getTournamentDBModel(): Promise<TournamentDBModel> {
        const tournamentModel = new TournamentDBModel(await this._pool.connect());
        await tournamentModel.init();
        return tournamentModel;
    }

    async getBookingDBModel(): Promise<BookingDBModel> {
        const bookingModel = new BookingDBModel(await this._pool.connect());
        await bookingModel.init();
        return bookingModel;
    }

    async getTicketDBModel(): Promise<TicketDBModel> {
        const ticketModel = new TicketDBModel(await this._pool.connect());
        await ticketModel.init();
        return ticketModel;
    }

    private _pool: Pool;

}

export async function getDataBase(): Promise<Database> {
    if (!database) {
        database = new Database();
        await database.init();
    }
    return database;
}

