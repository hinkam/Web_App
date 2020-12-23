import React from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

interface LoginPageProps {
    loginCallBack: (isLogged: boolean, userName: string) => void
    isLogged: boolean
}

interface LoginPageState {
    userName: string
    password: string
    warningLabelVisibility: 'hidden' | 'visible'
}


export class LoginPage extends React.Component<LoginPageProps, LoginPageState> {


    constructor(props: LoginPageProps) {
        super(props);
        this.onButtonClicked = this.onButtonClicked.bind(this);
        this.handleNickname = this.handleNickname.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.state = {
            userName: '',
            password: '',
            warningLabelVisibility: 'hidden'
        };
    }

    async onButtonClicked(): Promise<void> {
        const response = await fetch( '/api/auth/login',  {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nickname: this.state.userName,
                password: this.state.password
            })
        });
        if (!response.ok) {
            this.setState( { warningLabelVisibility: 'visible' } );
        } else {
            this.props.loginCallBack(true, this.state.userName);
        }
    }

    handleNickname(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({ userName: event.target.value });
    }

    handlePassword(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({ password: event.target.value });
    }

    render(): JSX.Element {
        if (this.props.isLogged) {
            return (
                <Redirect to='/'/>
            );
        } else {
            return (
                <>
                    <Container style={ { maxWidth: '570px' } }>
                        <Form>
                            <Form.Group>
                                <Form.Label>Nickname</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter email"
                                    value={this.state.userName}
                                    onChange={this.handleNickname} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={this.handlePassword} />
                                <Form.Text
                                    style={{ visibility: this.state.warningLabelVisibility, color: 'red' }}>
                                    Incorrect password or username
                                </Form.Text>
                            </Form.Group>
                            <Button
                                onClick = {this.onButtonClicked}
                                variant="primary">
                                Login
                            </Button>
                        </Form>
                    </Container>
                </>
            );
        }
    }
}
