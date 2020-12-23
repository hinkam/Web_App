import React from 'react';
import { TournamentCard } from './tournament';

interface ITournament {
    tournament_name: string
    seat_cnt: number
    stadium_location: string
}


interface MainPageProps {
    text: string
}

interface MainPageState {
    isLoaded: boolean
    tournaments: Array<ITournament>
}


export class MainPage extends React.Component<MainPageProps, MainPageState> {

    constructor(props: MainPageProps) {
        super(props);
        this.state = {
            isLoaded: false,
            tournaments: []
        };
    }

    async componentDidMount(): Promise<void> {
        const response = await fetch('/api/tournams');
        this.setState({
            isLoaded: true,
            tournaments: await response.json() as Array<ITournament>
        });
    }

    render(): JSX.Element {
        return (
            <>
                <div>{this.state.tournaments.map((tournament) => {
                    return (<TournamentCard
                        image_path="https://sun9-71.userapi.com/impg/XwoiQn2W02085PdIChXOK60mVcXqqJhvieMijQ/9a0YL36CJm0.jpg?size=512x392&quality=96&proxy=1&sign=faf63521fa31cd04d437cb0173bcebfc&type=album"
                        tournament_name={tournament.tournament_name}
                        stadium_location={tournament.stadium_location}
                        seat_cnt={tournament.seat_cnt}/>);
                })
                }
                </div>
            </>
        );
    }
}
