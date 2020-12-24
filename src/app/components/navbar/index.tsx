import React from 'react';
import { Navbar, Nav, Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


interface NavBarProps {
    logoutCallBack: (isLogged: boolean, userName: string) => void
    userName: string
    isLogged: boolean
}


export class NavBar extends React.Component<NavBarProps> {

    constructor(props: NavBarProps) {
        super(props);
        this.onButtonClicked = this.onButtonClicked.bind(this);
    }

    async onButtonClicked(): Promise<void> {
        const response = await fetch( '/api/auth/logout' );
        if (!response.ok) {
            response.status;
        } else {
            this.props.logoutCallBack(false, ' ');
        }
    }

    render(): JSX.Element {
        return (
            <Navbar>
                <Nav className='container-fluid'>
                    <Container>
                        <Row className='flex-fill justify-content-between'>
                            <Nav.Link as={ Link } to='/'>Home</Nav.Link>
                            <div className='justify-content-between d-flex'>
                                <Nav.Link as={ Link } to='/login' style={{ visibility: this.props.isLogged ? 'hidden' : 'visible' }}>Login</Nav.Link>
                                <Nav.Link as={ Link } to='/register' style={{ visibility: this.props.isLogged ? 'hidden' : 'visible' }}>Register</Nav.Link>
                                <Nav.Link
                                    style={{ visibility: this.props.isLogged ? 'visible' : 'hidden' }}>
                                    {this.props.userName}
                                </Nav.Link>
                                <Nav.Link
                                    style={{ visibility: this.props.isLogged ? 'visible' : 'hidden' }}>
                                    <Button onClick = {this.onButtonClicked}>
                                            Logout
                                    </Button>
                                </Nav.Link>
                            </div>
                        </Row>
                    </Container>
                </Nav>
            </Navbar>
        );
    }
}
