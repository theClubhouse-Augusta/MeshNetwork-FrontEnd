/**
*
* Checkout
*
*/
import React from 'react';
import {Elements} from 'react-stripe-elements';
import { StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';

import './style.css';
import './styleM.css';
export default class Checkout extends React.Component {
  state = {
    key: '',
    loaded: '',
    component: '',
  };

  componentDidMount() {
    this.loadKey();
  }

  loadKey = () => {
    fetch(`http://innovationmesh.com/api/publickey/${this.props.match.params.id}`, {
    })
    .then(response => response.text())
    .then(Key => {
      if (Key) {
        this.setState({key: Key, loaded: true}, () => this.renderCheckoutForm());
      } else {
        this.setState({loaded: true}, () => this.renderCheckoutForm());
      }
    })
  }

  renderCheckoutForm = () =>
    this.state.key ?
      this.setState({ component:
        <StripeProvider apiKey={this.state.key}>
          <Elements>
            <CheckoutForm pubkey {...this.props} />
          </Elements>
        </StripeProvider>
      })
    :
    this.setState({ component:
       <StripeProvider apiKey="">
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
