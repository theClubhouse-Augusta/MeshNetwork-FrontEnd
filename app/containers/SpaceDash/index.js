/*
 *
 * SpaceDash
 *
 */

import React from 'react';
import Helmet from 'react-helmet';

import './style.css';
import './styleM.css';

export default class SpaceDash extends React.PureComponent {
  render() {
    return (
      <div className="container">
        <Helmet title="SpaceDash" meta={[ { name: 'description', content: 'Description of SpaceDash' }]}/>

        //Remove this line and you can start writing your code here.
      </div>
    );
  }
}

SpaceDash.contextTypes = {
  router: React.PropTypes.object
};
