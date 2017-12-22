  /**
*
* BookingTourForm
*
*/

import React from 'react';

import './style.css';
import './styleM.css';

export default class BookingTourForm extends React.PureComponent {
  render() {
    return (
      <div>
        <h2> your information</h2>
          <form className="bookingForm"> 
           <p className="bookingFormLine">
             <label htmlFor="">Name</label>
           <input type="text" style={{width: '50%'}}/>
           </p>

           <p className="bookingFormLine">
             <label htmlFor="">Email</label>
           <input type="text" style={{width: '50%'}}/>
           </p>

           <p className="bookingFormLine">
             <label htmlFor="">Phone </label>
              <input type="tel" style={{width: '50%'}}/>
           </p>

           <p className="bookingFormLine">
             <label htmlFor="" style={{maxWidth: '60%'}}> Would you like to recieve an email reminder? </label>
           <input type="radio"/>
           </p>
           <button label="Submit" primary={true} style={{margin: '1em auto'}}/>
          </form>
      </div>
    );
  }
}