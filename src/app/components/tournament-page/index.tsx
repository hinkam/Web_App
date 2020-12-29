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
                    <Image className="float-right" src='https://adindex.ru/files2/publications/2018_02/169462_Image-3.png' />
                    <h1>{this.state.tournament_name}</h1>
                    <h3>Stadium Location {this.state.stadium_location}</h3>
                    <p>Seats left {this.state.seat_cnt}</p>
                    <Link to="/payment">
                        <Button>
                            Buy ticket
                        </Button>
                    </Link>
                </Container>
            </>
        );
    }
}
