/**
*
* BookingCard
*
*/

import React from 'react';
import {Card, CardActions, CardTitle} from 'material-ui/Card';

import './style.css';
import './styleM.css';


export default class BookingCard extends React.PureComponent {

  state = {
    isSelected: false, 
  }; 

  handleCardSelect= () => {
    this.setState({ isSelected: true}); 
  }; 

  render() { 
    return 
    <Card>
      <CardTitle title={room.name}></CardTitle>
    </Card> 
  }
}

BookingCard.contextTypes = {
  router: React.PropTypes.object
};
