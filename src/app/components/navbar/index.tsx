import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export class NavBar extends React.Component {
    render(): JSX.Element {
        return (
            <Navbar>
                <Nav>
                    <Nav.Link as={ Link } to='/'>Home</Nav.Link>
                    <Nav.Link as={ Link } to='/login'>Login</Nav.Link>
                    <Nav.Link as={ Link } to='/register'>Register</Nav.Link>
                </Nav>
            </Navbar>
        );
    }
}
