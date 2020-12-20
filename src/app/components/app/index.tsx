import React from 'react';
import { Button } from 'react-bootstrap';

import './app.css';


export class App extends React.Component {
    render(): JSX.Element {
        return (
            <>
                <h1>Hello world</h1>
                <Button variant="outline-primary">Why not</Button>
            </>
        );
    }
}
