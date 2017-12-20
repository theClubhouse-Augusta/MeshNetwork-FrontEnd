/**
*
* KioskUpcomingEvents
*
*/

import React from 'react';
import Card, { CardHeader, CardContent } from 'material-ui/Card';

import './style.css';
import './styleM.css';


//const kioskLocation = this.props.location; 

// const kioskEvents= kioskLocation.events.slice((array.length-3), end); 
//grab events from API with location param 
// validate location & whether approved 
// cut arr down to 0,1,2 
// ??? separate datetime into date & time ???
//reassign to form state can use 


//reminder sendy vehicle 

// const events= this.props.location.events.slice(0,2); 

export default class KioskUpcomingEvents extends React.PureComponent {
  state = {
    events: [
      {title: 'PyNight', date: 'Fri, Dec 15', time: '5pm'}, 
      {title: 'Growler Gardening', date: 'Fri, Dec 22', time: '5pm'}, 
      {title: 'Robotics Meetup', date: 'Mon, Jan 22', time: '6pm'}, 
    ],     
  }

  
  render() {
    const upcomingCards = this.state.events.map((event) => (
          <Card key={"kioskEvent-" + event.title} className="kioskEventCard">
            <CardHeader className="kioskEventHeader" title={event.title} style={{textAlign: 'center'}} />
            <CardContent className="kioskEventContent">
              <div className="kioskEventDateTime">
                <p style={{margin: '0 1em 1em 1em'}}> {event.date} </p>
                <p style={{margin: '0 1em 1em 1em'}}> {event.time} </p> 
              </div>
              <div className="kioskEventButtonWrapper">
                <button style={{border: '1px solid red', padding: '10px'}}> Send reminder? </button> 
              </div> 
            </CardContent>  
          </Card> 
    )); 

    const thanks = " Heres whats happening @ theC"; 
    
    return (
      <div className="kioskFlowThreeContainer">
         <div className="kioskWelcome">
            <h2>{this.props.afterLoginMsg}</h2>
          </div>

          <div className="kioskEventsContainer">
            {upcomingCards}
          </div>

      </div>
    );
  }
}

KioskUpcomingEvents.contextTypes = {
  router: React.PropTypes.object, 
  location: React.PropTypes.object,
  afterLoginMsg: React.PropTypes.string, 
  username: React.PropTypes.string
};
