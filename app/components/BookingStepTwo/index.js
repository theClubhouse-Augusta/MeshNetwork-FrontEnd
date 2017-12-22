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

export default class BookingStepTwo extends React.PureComponent {
   
  state = {
    rooms: [
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
    ],
  }; 
  
  render() {
    return (
      <div className="stepTwoContainer">
         { /*  <BookingTourForm />*/ }  
         { /* <BookingCardBlock  rooms={this.state.rooms} />*/} 
         <BookingMentorForm /> 
         
      </div>
    );
  }
}

