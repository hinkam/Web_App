import React from 'react';
import { Route } from 'react-router-dom';

import './app.css';

import { NavBar } from '../navbar';
import { MainPage } from '../main-page';
import { LoginPage } from '../login-page';
import { RegisterPage } from '../register-page';

interface AppState {
    isLogged: boolean
    userName: string
}

export class App extends React.Component<unknown, AppState> {
    constructor(props: unknown) {
        super(props);
        this.state = {
            isLogged: false,
            userName: 'someuser'
        };
    }
    render(): JSX.Element {
        return (
            <>
                <NavBar isLogged={this.state.isLogged} userName={this.state.userName}/>
                <Route exact path='/'><MainPage text='Text here'/></Route>
                <Route path='/login'><LoginPage/></Route>
                <Route path='/register'><RegisterPage/></Route>
            </>
        );
    }
}
