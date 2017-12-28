/**
*
* SpaceInformation
*
*/

import React from 'react';

import './style.css';
import './styleM.css';

export default class SpaceInformation extends React.PureComponent {
  render() {
    return (
      <div>
          <h1> OMG IT WORKED</h1>
      </div>
    );
  }
}

SpaceInformation.contextTypes = {
  router: React.PropTypes.object
};
