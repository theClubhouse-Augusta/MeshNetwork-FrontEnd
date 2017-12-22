/**
*
* KioskFlowTwo
*
*/

import React from 'react';
import Card, { CardHeader, CardContent } from 'material-ui/Card';

import './style.css';
import './styleM.css';

/* const visitReasons = this.props.location.reasons; */ 

const visitReasons = [
  {name: 'Work', value: 'Work' },
  {name: 'Event or Meeting', value: 'Events'},
  {name: 'Tours', value: 'Tour' },
]

//fetched from kiosk db 

export default class KioskFlowTwo extends React.PureComponent {
  state = {
    reasons: visitReasons,
    //user: {this.props.user}, 
  }

  handleReasonSelect = () => {
    console.log("Clicky");  
  }
  
//APPEARANCE APIs for metrics 


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

     
      </div>
    );
  }
}
