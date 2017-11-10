/*
 *
 * AddEvent
 *
 */

import React from 'react';
import Helmet from 'react-helmet';

import './style.css';
import './styleM.css';

export default class AddEvent extends React.PureComponent {
  render() {
    return (
      <div className="container">
        <Helmet title="AddEvent" meta={[ { name: 'description', content: 'Description of AddEvent' }]}/>

        //Remove this line and you can start writing your code here.
      </div>
    );
  }
}

AddEvent.contextTypes = {
  router: React.PropTypes.object
};
