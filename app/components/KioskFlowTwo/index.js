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
    const reasonCards = this.state.reasons.map((reason) => (
          <Card key={'reasonCard-' + reason.name} className="kioskReasonCard" onClick={this.handleReasonSelect}>
            <CardHeader className="kioskCardHeader" title={reason.name} />  
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

KioskFlowTwo.contextTypes = {
  router: React.PropTypes.object,
  user: React.PropTypes.object, 
  events: React.PropTypes.object,  
  reasonLabel: React.PropTypes.string, 
  reasons: React.PropTypes.array, 
};
