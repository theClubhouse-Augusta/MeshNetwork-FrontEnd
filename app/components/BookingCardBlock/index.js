/**
*
* BookingCardBlock
*
*/

import React from 'react';
import Card, {CardActions, CardHeader} from 'material-ui/Card'; 

import './style.css';
import './styleM.css';



export default class BookingCardBlock extends React.PureComponent {  
  render() {

    const roomCards = this.props.rooms.map((room) => (
      <Card className="bookingCard" key={'bookRoom-' + room.name}>
      <CardHeader
      title={room.name} />
      </Card>
    )); 

    return ( 
      <div className="bookingRoomBooking">
        <div className="bookingRoomsCardBlock">
          {roomCards}
        </div>


        <div className="bookingRoomStepThree">
        
        </div>        
      </div>
    );
  }
}

