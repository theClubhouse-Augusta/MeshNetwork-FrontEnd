/**
*
* EventHomeCalender
*
*/

import React from 'react';
import Card, { CardMedia, CardContent, CardHeader } from 'material-ui/Card'; 

import './style.css';
import './styleM.css';

export default class EventHomeCalender extends React.PureComponent {
  render() {
    const events =[
      { 
        name: 'Javascript Meetup', 
        time: '6:30-8pm',  
        date: 'Thurs, November 30th', 
        image: '', 
        description: 'Object Modeling with Mongoose',
        location: 'the Clubhou.se',
      }, 
      { 
        name: 'One Million Cups', 
        time: '8:30am', 
        date: 'Wed, December 6th', 
        image: '', 
        description: 'Pitches, and coffee, and mingling',
        location: 'the Clubhou.se',
      }
    ]; 

    let eventCards;
    if (events.length) {
      eventCards = events.map((event) => (
        <Card className="eventCard" containerStyle={{width: '100%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap',  justifyContent: 'space-between'}}> 
          <CardMedia className="eventCardImage">
          
          </CardMedia>

          <div className="eventCardContent">
            <CardHeader title={event.name} style={{padding: '0'}} />
            <div className="eventCardDetails">
              <span className="eventCardDate" style={{margin: '1em 0'}}> {event.date} </span>
              <span className="eventCardTime" style={{margin: '1em'}}>
                {event.time} 
              </span>
              <span className="eventCardLocation" style={{margin: '1em 0 0 1em'}}> {event.location} </span>
            </div>
            <p className="eventCardDescription"> {event.description} </p> 
          </div>
        </Card>
      )); 
    } else {
      eventCards = <p> no events placeholder </p>;
    }

    return (
      <div className="eventHomeCalendar">
        {eventCards}
      </div>
    );
  }
}
