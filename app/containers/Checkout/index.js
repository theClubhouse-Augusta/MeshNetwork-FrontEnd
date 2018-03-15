/**
*
* Checkout
*
*/
import React from 'react';
import { Elements } from 'react-stripe-elements';
import { StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';

import './style.css';
import './styleM.css';
export default class Checkout extends React.Component {
    constructor() {
        super();
        this.state = {
//            stripe: null,
            key: '',
            loaded: '',
            component: '',
        };
    }

    async componentDidMount() {
        if (window.Stripe) {
            this.loadKey();
        } else {
            document.querySelector('#stripe-js').addEventListener('load', () => {
                // Create Stripe instance once Stripe.js loads
                this.loadKey();
                // this.setState({stripe: window.Stripe(key)});
            });
        }
    }


    loadKey = async () => {
        let key;
        try {
            const response = await fetch(`https://innovationmesh.com/api/publickey/${this.props.match.params.id}`);
            key = await response.text();
        } catch (error) {
            //
        } finally {
            if (key) {
                this.setState(() => ({ key }));
                this.setState(() => ({ loaded: true }), () => {
                    this.renderCheckoutForm();
                });
            } else {
                this.setState(() => ({ loaded: true }), () => this.renderCheckoutForm());
            }
        }
    }

    renderCheckoutForm = () =>
        this.state.key ?
            this.setState({
                component:
                    <StripeProvider apiKey={this.state.key}>
                        <Elements>
                            <CheckoutForm pubkey {...this.props} />
                        </Elements>
                    </StripeProvider>
            })
            :
            this.setState({
                component:
                    <StripeProvider apiKey="pk_test_rJKqFRMRduGAyguxdWT2TfcI">
                        <Elements>
                            <CheckoutForm pubkey={false} {...this.props} />
                        </Elements>
                    </StripeProvider>
            });


    render() {
        return (
            this.state.loaded && this.state.component
        );
    }
}

      /* <StripeProvider apiKey="pk_test_rJKqFRMRduGAyguxdWT2TfcI"> */
