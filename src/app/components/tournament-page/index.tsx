import React from 'react';
import { Button, Container, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './button.css';

interface ITournament {
    tournament_name: string
    seat_cnt: number
    stadium_location: string
}

interface TournamentPageProps {
    match: {
        params: {
            tournament_name: string
        }
    }
}

interface TournamentPageState {
    tournament_name: string
    seat_cnt: number
    stadium_location: string
}

export class TournamentPage extends React.Component<TournamentPageProps, TournamentPageState> {

    constructor(props: TournamentPageProps) {
        super(props);
        this.state = {
            tournament_name: ' ',
            seat_cnt: 0,
            stadium_location: ' '
        };
    }

    async componentDidMount(): Promise<void> {
        const response = await fetch(`/api/tournams/tournament/${this.props.match.params.tournament_name}`);
        const answer = await response.json() as ITournament;
        console.log(answer);
        this.setState({
            tournament_name: answer.tournament_name,
            seat_cnt: answer.seat_cnt,
            stadium_location: answer.stadium_location
        });
    }


    render(): JSX.Element {
        return (
            <>
                <Container>
                    <Image className="float-right" src='https://sun9-71.userapi.com/impg/XwoiQn2W02085PdIChXOK60mVcXqqJhvieMijQ/9a0YL36CJm0.jpg?size=512x392&quality=96&proxy=1&sign=faf63521fa31cd04d437cb0173bcebfc&type=album' />
                    <h1>{this.state.tournament_name}</h1>
                    <h3>Stadium Location {this.state.stadium_location}</h3>
                    <p>Seats left {this.state.seat_cnt}</p>
                    <Link to="/">
                        <Button>
                            Buy ticket
                        </Button>
                    </Link>
                </Container>
            </>
        );
    }
}
