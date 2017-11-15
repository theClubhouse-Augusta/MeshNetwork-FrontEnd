/**
*
* BookingStepTwo
*
*/

import React from 'react';
import BookingCardBlock from 'components/BookingCardBlock'; 
import BookingTourForm from 'components/BookingTourForm'; 
import BookingMentorForm from 'components/BookingMentorForm'; 

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

BookingStepTwo.contextTypes = {
  router: React.PropTypes.object
};
