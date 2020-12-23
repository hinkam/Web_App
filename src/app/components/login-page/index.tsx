import React from 'react';
import { Button, Form, Container } from 'react-bootstrap';


interface LoginPageState {
    nickname: string
    password: string
    warningLabelVisibility: 'hidden' | 'visible'
}


export class LoginPage extends React.Component<unknown, LoginPageState> {


    constructor(props: unknown) {
        super(props);
        this.onButtonClicked = this.onButtonClicked.bind(this);
        this.handleNickname = this.handleNickname.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.state = {
            nickname: '',
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
                nickname: this.state.nickname,
                password: this.state.password
            })
        });
        if (!response.ok) {
            this.setState( { warningLabelVisibility: 'visible' } );
        }
    }

    handleNickname(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({ nickname: event.target.value });
    }

    handlePassword(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({ password: event.target.value });
    }

    render(): JSX.Element {
        return (
            <>
                <Container style={ { maxWidth: '570px' } }>
                    <Form>
                        <Form.Group>
                            <Form.Label>Nickname</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter email"
                                value={this.state.nickname}
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
