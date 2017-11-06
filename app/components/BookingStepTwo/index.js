/**
*
* BookingStepTwo
*
*/

import React from 'react';
import BookingCardBlock from 'components/BookingCardBlock'; 

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
      <div>
          <BookingCardBlock  rooms={this.state.rooms} />  
      </div>
    );
  }
}

BookingStepTwo.contextTypes = {
  router: React.PropTypes.object
};
