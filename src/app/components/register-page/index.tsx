import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';


interface RegisterPageState {
    nickname: string
    password: string
    reppassword: string
    warningLabelVisibility: 'hidden' | 'visible'
}


export class RegisterPage extends React.Component<unknown, RegisterPageState> {

    constructor(props: unknown) {
        super(props);
        this.onButtonClicked = this.onButtonClicked.bind(this);
        this.handleNickname = this.handleNickname.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleRePassword = this.handleRePassword.bind(this);
        this.state = {
            nickname: '',
            password: '',
            reppassword: '',
            warningLabelVisibility: 'hidden'
        };
    }

    async onButtonClicked(): Promise<void> {
        if (this.state.password == this.state.reppassword && this.state.nickname.length > 0) {
            const response = await fetch( '/api/auth/register',  {
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
                alert('Register failure');
            }
        } else {
            return;
        }
    }

    handleNickname(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({ nickname: event.target.value });
    }

    handlePassword(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({ password: event.target.value });
    }

    handleRePassword(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({ reppassword: event.target.value });
        if ( this.state.password == event.target.value ) {
            this.setState( { warningLabelVisibility: 'hidden' } );
        } else {
            this.setState( { warningLabelVisibility: 'visible' } );
        }
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
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Repeat password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={this.state.reppassword}
                                onChange={this.handleRePassword} />
                            <Form.Text
                                style={{ visibility: this.state.warningLabelVisibility }}>
                                Passwords dont match
                            </Form.Text>
                        </Form.Group>
                        <Button
                            onClick = {this.onButtonClicked}
                            variant="primary">
                            Register
                        </Button>
                    </Form>
                </Container>
            </>
        );
    }
}
