import React from 'react';
import { Route } from 'react-router-dom';

import './app.css';

import { NavBar } from '../navbar';
import { MainPage } from '../main-page';
import { LoginPage } from '../login-page';
import { RegisterPage } from '../register-page';
import { TournamentPage } from '../tournament-page';

interface AppState {
    isLogged: boolean
    userName: string
}


export class App extends React.Component<unknown, AppState> {
    constructor(props: unknown) {
        super(props);
        this.onLogin = this.onLogin.bind(this);
        this.state = {
            isLogged: false,
            userName: ' '
        };
    }

    onLogin(isLogged: boolean, userName: string): void {
        this.setState({ isLogged, userName });
    }

    async componentDidMount(): Promise<void> {
        console.log('123123');
        const response = await fetch('/api/user');
        if (response.status != 401) {
            const answer = await response.json() as { userName: string };
            this.setState({
                isLogged: true,
                userName: answer.userName
            });
        }
    }

    render(): JSX.Element {
        return (
            <>
                <NavBar isLogged={this.state.isLogged} userName={this.state.userName}/>
                <Route exact path='/'><MainPage text='Text here'/></Route>
                <Route path='/login'><LoginPage loginCallBack={this.onLogin} isLogged={this.state.isLogged}/></Route>
                <Route path='/register'><RegisterPage/></Route>
                <Route path='/tournament/:tournament_name' component={TournamentPage}/>
            </>
        );
    }
}
