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
    const reasonCards = this.state.reasons.map((reason) => (
          <Card key={reason.value} className="kioskReasonCard">
            <CardHeader className="kioskCardHeader" title={reason.name} />  
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

KioskFlowTwo.contextTypes = {
  router: React.PropTypes.object
};
