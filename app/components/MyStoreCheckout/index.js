import React from 'react';
import { Elements } from 'react-stripe-elements';
import CheckoutForm from '../../components/CheckoutForm';

class MyStoreCheckout extends React.PureComponent {
  render() {

    const bodyContainer = {      
      background: '#f6edeb',
    /*  height: '100vh',     */ 
    }

    const elementsWrapper = {
      width: '30%', 
      margin: '0 auto',
      paddingTop: '10%', 
    }
    return (
      
        <div style={bodyContainer}>
           
        <div style={elementsWrapper}> 
          <Elements>
            <CheckoutForm />
          </Elements>
        </div>

        </div> 
      
    );
  }
}
export default MyStoreCheckout;


