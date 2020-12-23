import React from 'react';
import { Route } from 'react-router-dom';

import './app.css';

import { NavBar } from '../navbar';
import { MainPage } from '../main-page';
import { LoginPage } from '../login-page';
import { RegisterPage } from '../register-page';

export class App extends React.Component {
    render(): JSX.Element {
        return (
            <>
                <NavBar/>
                <Route exact path='/'><MainPage text='Text here'/></Route>
                <Route path='/login'><LoginPage/></Route>
                <Route path='/register'><RegisterPage/></Route>
            </>
        );
    }
}
