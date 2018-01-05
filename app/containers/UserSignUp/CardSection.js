import React from 'react';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  PostalCodeElement
} from 'react-stripe-elements';

class CardSection extends React.Component {
  render() {
    return (
      <div>
        <label>
          Card number
          <CardNumberElement
  //          onBlur={handleBlur}
//            onChange={handleChange}
    //        onFocus={handleFocus}
      //      onReady={handleReady}
        //    {...createOptions(this.props.fontSize)}
          />
        </label>

        <label>
          Expiration date
          <CardExpiryElement
         //   onBlur={handleBlur}
       //     onChange={handleChange}
     //       onFocus={handleFocus}
   //         onReady={handleReady}
///            {...createOptions(this.props.fontSize)}
          />
        </label>

        <label>
          CVC
          <CardCVCElement
    //        onBlur={handleBlur}
  //          onChange={handleChange}
//            onFocus={handleFocus}
      //      onReady={handleReady}
        //    {...createOptions(this.props.fontSize)}
          />
        </label>

        <label>
          Postal code
          <PostalCodeElement
           // onBlur={handleBlur}
           // onChange={handleChange}
           // onFocus={handleFocus}
           // onReady={handleReady}
          //  {...createOptions(this.props.fontSize)}
          />

        </label>
        </div>
    );
  }
};
export default CardSection;