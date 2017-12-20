/**
*
* BookingMentorForm
*
*/

import React from 'react';

 

import './style.css';
import './styleM.css';

export default class BookingMentorForm extends React.PureComponent {
  render() {
    return (
      <div>
        <form action="" className="bookingForm">
          
          <p className="mentorDescription"> Julie is a developer mentor & can help with the following areas. </p>
          
          <div className="mentorTagsWrapper">
          <p className="tagDirections"> 
          Please choose a tag, if any, to describe the main topic of the meeting. 
        </p>
           
         </div>

        

         <p className="mentorDisclaimer"> 
          Please note: mentors are provided your information upon booking & may reach out to you. 
        </p>

       

         <button label="Next" style={{margin: '1em auto'}}/>
        </form>       
      </div>
    );
  }
}
