/*
 *
 * BookingSystem
 *
 */

import React from 'react';
import Helmet from 'react-helmet';

import './style.css';
import './styleM.css';

export default class BookingSystem extends React.PureComponent {
  render() {
    return (
      <div className="container">
        <Helmet title="BookingSystem" meta={[ { name: 'description', content: 'Description of BookingSystem' }]}/>

        //Remove this line and you can start writing your code here.
      </div>
    );
  }
}

BookingSystem.contextTypes = {
  router: React.PropTypes.object
};
