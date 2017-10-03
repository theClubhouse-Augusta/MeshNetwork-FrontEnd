/*
 *
 * EventDetail
 *
 */

import React from 'react';
import Helmet from 'react-helmet';

import './style.css';
import './styleM.css';

export default class EventDetail extends React.PureComponent {
  render() {
    return (
      <div className="container">
        <Helmet title="EventDetail" meta={[ { name: 'description', content: 'Description of EventDetail' }]}/>

        //Remove this line and you can start writing your code here.
      </div>
    );
  }
}

EventDetail.contextTypes = {
  router: React.PropTypes.object
};
