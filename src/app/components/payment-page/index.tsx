import React from 'react';
import { Container } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

interface PaymentPageProps {
    isLogged: boolean
}

interface PaymentPageState {
    timedOut: boolean
}

export class PaymentPage extends React.Component<PaymentPageProps, PaymentPageState> {

    constructor(props: PaymentPageProps) {
        super(props);
        this.state = {
            timedOut: false
        };
    }

    async componentDidMount(): Promise<void> {
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(null);
            }, 5000);
        });
        this.setState({
            timedOut: true
        });
    }

    render(): JSX.Element {
        if (this.props.isLogged) {
            if (!this.state.timedOut) {
                return (
                    <Container>
                        <h1>There should have been payment proceeding form, but i am too lazy</h1>
                        <p>Thats why you will be redirected in a sec</p>
                    </Container>
                );
            } else {
                return (
                    <Redirect to='/' />
                );
            }
        } else {
            return (
                <Redirect to='/' />
            );
        }

    }
}

