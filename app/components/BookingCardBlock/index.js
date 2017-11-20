/**
*
* BookingCardBlock
*
*/

import React from 'react';
import BookingCard from 'components/BookingCard';
import {Card, CardActions, CardTitle} from 'material-ui/Card'; 

import './style.css';
import './styleM.css';

export default class BookingCardBlock extends React.PureComponent {

  render() {

    const roomCards = this.props.rooms.map((room) => (
      <Card className="bookingCard">
      <CardTitle 
      title={room.name}/>
      </Card>
    )); 

    return (
      <div className="bookingCardBlock"> 
        {roomCards}
      </div>
    );
  }
}

