/*
 *
 * SpaceSignUp
 *
 */

import React from 'react';
import Helmet from 'react-helmet';

import './style.css';
import './styleM.css';

export default class SpaceSignUp extends React.PureComponent {
  render() {
    return (
      <div className="container">
        <Helmet title="SpaceSignUp" meta={[ { name: 'description', content: 'Description of SpaceSignUp' }]}/>

        //Remove this line and you can start writing your code here.
      </div>
    );
  }
}

SpaceSignUp.contextTypes = {
  router: React.PropTypes.object
};
