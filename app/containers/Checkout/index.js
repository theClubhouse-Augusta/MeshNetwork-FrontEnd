/**
*
* Checkout
*
*/
import React from 'react';
import {Elements} from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';

import './style.css';
import './styleM.css';
class Checkout extends React.Component {
  render() {
    return (
      <Elements>
        <CheckoutForm {...this.props} />
      </Elements>
    );
  }
}

export default Checkout;