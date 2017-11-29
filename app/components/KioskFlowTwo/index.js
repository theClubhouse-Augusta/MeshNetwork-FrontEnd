/**
*
* KioskFlowTwo
*
*/

import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import KioskSuggestedEvents from 'components/KioskSuggestedEvents'; 

import './style.css';
import './styleM.css';

export default class KioskFlowTwo extends React.PureComponent {
  state = {
    reasons: [
      {name: 'Work', value: 'Work' },
      {name: 'Event or Meeting', value: 'Events'},
      {name: 'Tour', value: 'Tour' },
    ]
  }
  render() {
    const reasonCards = this.state.reasons.map((reason) => (
          <Card className="reasonCard">
            <CardTitle 
              title={reason.name} />
          </Card> 
    )); 
    return (
      <div className="kioskFlowTwoContainer">
          <div className="kioskVisitReasonBlock">
          {reasonCards}
          </div>

          <KioskSuggestedEvents />
      </div>
    );
  }
}

KioskFlowTwo.contextTypes = {
  router: React.PropTypes.object
};
