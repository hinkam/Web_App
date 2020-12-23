export interface Initializeable {
    async init(): Promise<void>
}

export interface Releaseable {
    release(): void
}

export interface IRegister {
    nickname: string
    password: string
}

export interface ILogin {
    nickname: string
    password: string
}

export interface IUserInfo {
    userid: number
    pwhash: string
}

export interface ITournamentInfo {
    tournament_name: string
    seats_cnt: number
    stadium_location: string
}
