import React from 'react';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';


interface NavBarProps {
    userName: string
    isLogged: boolean
}


export class NavBar extends React.Component<NavBarProps> {


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
                                    Logout
                                </Nav.Link>
                            </div>
                        </Row>
                    </Container>
                </Nav>
            </Navbar>
        );
    }
}
