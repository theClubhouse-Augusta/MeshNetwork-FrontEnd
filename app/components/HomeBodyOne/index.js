/**
*
* HomeBodyOne
*
*/

import React from 'react';

import './style.css';
import './styleM.css';

export default class HomeBodyOne extends React.PureComponent {
  render() {
    return (
      <div className="homeSection" id="homeOne">
        <div className="homeBodyHeaderSlant">
          MESH NETWORK<br/>
          OF INNOVATION
        </div>
      </div>
    );
  }
}

HomeBodyOne.contextTypes = {
  router: React.PropTypes.object
};
