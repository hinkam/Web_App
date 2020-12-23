import React from 'react';
import { Button, Card, Col, Row, Image, Container } from 'react-bootstrap';

interface TournamentCardProps {
    image_path: string
    tournament_name: string
    seat_cnt: number
    stadium_location: string
}


export class TournamentCard extends React.Component<TournamentCardProps> {

    constructor(props: TournamentCardProps) {
        super(props);
    }


    render(): JSX.Element {
        return (
            <>
                <Card>
                    <Card.Body>
                        <Container className="d-flex">
                            <Col sm={8}>
                                <Row>
                                    <Card.Title>{this.props.tournament_name}</Card.Title>
                                </Row>
                                <Row>
                                    <Col><Card.Text>Seats availabe: {this.props.seat_cnt}</Card.Text></Col>
                                    <Col><Card.Text>Location: {this.props.stadium_location}</Card.Text></Col>
                                </Row>
                                <Row>
                                    <Button
                                        // Router link
                                        variant="primary">
                                        Show tickets
                                    </Button>
                                </Row>
                            </Col>
                            <Col sm={4}>
                                <Image className="float-right" src={this.props.image_path} style={{ maxWidth: '350px', maxHeight: '180px' }}/>
                            </Col>
                        </Container>
                    </Card.Body>
                </Card>
            </>
        );
    }
}
