/*
 *
 * Checkout
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import MyStoreCheckout from './MyStoreCheckout';
import {StripeProvider} from 'react-stripe-elements';

import './style.css';
import './styleM.css';

const Checkout = props =>      
  <StripeProvider 
    apiKey={props.apiKey ? props.apiKey : "pk_test_12345"}
  >
    <MyStoreCheckout />
  </StripeProvider>
  export default Checkout;
