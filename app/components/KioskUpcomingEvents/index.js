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

  render() {
    const { thanks, events } = this.props;
    let upcomingCards;
    if (events.length) {
      upcomingCards = events.map((event, key) => (
        <Card  key={`$kioskEventCard{key}`} className="kioskEventCard">
          <CardHeader className="kioskEventHeader" title={event.title} style={{textAlign: 'center'}} />
          <CardContent className="kioskEventContent">
            <div className="kioskEventDateTime">
              <p style={{margin: '0 1em 1em 1em'}}> {event.start} </p>
              <p style={{margin: '0 1em 1em 1em'}}> {event.end} </p> 
            </div>
            <div className="kioskEventButtonWrapper">
              <button style={{border: '1px solid red', padding: '10px'}}> Send reminder? </button> 
            </div> 
          </CardContent>  
        </Card> 
      )); 
    } else {
      upcomingCards = <p> no events </p>;
    }
    
    return (
      <div className="kioskFlowThreeContainer">
<<<<<<< HEAD
         <div className="kioskThanks">
            <h2>{this.props.afterLoginMsg}</h2>
=======
         <div className="kioskWelcome">
            <h2>{thanks ? thanks : "In case they delete the userThanks"}</h2>
>>>>>>> bcbbff382de0582512e6c4be4c9308a7c604c3b5
          </div>

          <div className="kioskEventsContainer">
            {upcomingCards ? upcomingCards : "No upcoming events"}
          </div>

      </div>
    );
  }
}
