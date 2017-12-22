/**
*
* BookingStepTwo
*
*/

import React from 'react';
import BookingCardBlock from '../BookingCardBlock'; 
import BookingTourForm from '../BookingTourForm'; 
import BookingMentorForm from '../BookingMentorForm';

import './style.css';
import './styleM.css';

const rooms = [
  {
    name: 'Workshop', 
    availability: true, 
  }, 
  {
    name: 'Conference Room', 
    availability: false, 
  }, 
  {
    name: 'Computer Lab', 
    availability: true, 
  }
]

export default class BookingStepTwo extends React.PureComponent {
  
  
  render() {

  
    return (
      <div className="bookingNextStepsContainer">
        <div className="bookingStepTwo">
          { /*  <BookingTourForm />*/ }  
          { /* */} 
          {/* <BookingMentorForm /> */}

          <BookingCardBlock  rooms={rooms}/>
        </div>      
         
      </div>
    );
  }
}

