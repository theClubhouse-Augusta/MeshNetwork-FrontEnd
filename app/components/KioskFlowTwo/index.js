/**
*
* KioskFlowTwo
*
*/

import React from 'react';
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import KioskUpcomingEvents from 'components/KioskUpcomingEvents'; 

import './style.css';
import './styleM.css';

export default class KioskFlowTwo extends React.PureComponent {
  state = {
    reasons: [
      {name: 'Work', value: 'Work' },
      {name: 'Event or Meeting', value: 'Events'},
      {name: 'Tour', value: 'Tour' },
    ],     
  }

  //grab user obj 
  //add reason to user obj 
  //pass user obj down to KioskThree 


  render() {
    const { reasons, selectReason } = this.props
    const reasonCards = reasons.map((reason, key) => (
      <Card onClick={() => selectReason(reason)} key={`reason${key}`} className="kioskReasonCard">
        <CardHeader className="kioskCardHeader" title={reason} />  
      </Card> 
    )); 
    return (
      <div className="kioskFlowTwoContainer">
         
          <div className="kioskVisitReasonBlock">
            {reasonCards} 
          </div>

         {/* <KioskUpcomingEvents /> */}
      </div>
    );
  }
}
