/*
 *
 * NewEvent
 *
 */

import React from 'react';
import Helmet from 'react-helmet';

import './style.css';
import './styleM.css';

export default class NewEvent extends React.PureComponent {
  render() {
    return (
      <div className="container">
        <Helmet title="NewEvent" meta={[ { name: 'description', content: 'Description of NewEvent' }]}/>

        //Remove this line and you can start writing your code here.
      </div>
    );
  }
}

NewEvent.contextTypes = {
  router: React.PropTypes.object
};
