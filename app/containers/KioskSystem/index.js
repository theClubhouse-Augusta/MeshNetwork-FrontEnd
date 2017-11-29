/*
 *
 * KioskSystem
 *
 */

import React from 'react';
import Helmet from 'react-helmet';

import './style.css';
import './styleM.css';

export default class KioskSystem extends React.PureComponent {
  render() {
    return (
      <div className="container">
        <Helmet title="KioskSystem" meta={[ { name: 'description', content: 'Description of KioskSystem' }]}/>

        //Remove this line and you can start writing your code here.
      </div>
    );
  }
}

KioskSystem.contextTypes = {
  router: React.PropTypes.object
};
