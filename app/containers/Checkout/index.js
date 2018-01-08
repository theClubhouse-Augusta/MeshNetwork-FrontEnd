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
export default function Checkout(props) { 
  return (
    <StripeProvider apiKey="pk_test_rJKqFRMRduGAyguxdWT2TfcI">
      <Elements>
        <CheckoutForm {...props} />
      </Elements>
    </StripeProvider>
  );
}