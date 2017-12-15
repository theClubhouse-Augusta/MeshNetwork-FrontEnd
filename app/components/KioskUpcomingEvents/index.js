/**
*
* KioskUpcomingEvents
*
*/

import React from 'react';
import Card, { CardHeader, CardContent } from 'material-ui/Card';

import './style.css';
import './styleM.css';


 


export default class KioskUpcomingEvents extends React.PureComponent {
  state = {
    events: [
      {name: 'PyNight', date: 'Fri, Dec 15', time: '5pm'}, 
      {name: 'Growler Gardening', date: 'Fri, Dec 22', time: '5pm'}, 
      {name: 'Robotics Meetup', date: 'Mon, Jan 22', time: '6pm'}, 
    ],     
  }

  
  render() {
    const upcomingCards = this.state.events.map((event) => (
          <Card className="kioskEventCard">
            <CardHeader className="kioskEventHeader" title={event.name} style={{textAlign: 'center'}} />
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

    const thanks = {
      message: " Heres whats happening @ theC" 
    }; 
    
    return (
      <div className="kioskFlowThreeContainer">
         <div className="kioskWelcome">
            <h2>{thanks.message}</h2>
          </div>

          <div className="kioskEventsContainer">
            {upcomingCards}
          </div>

      </div>
    );
  }
}

KioskUpcomingEvents.contextTypes = {
  router: React.PropTypes.object
};
