/**
*
* HomeBodyThree
*
*/

import React from 'react';

import './style.css';
import './styleM.css';

export default class HomeBodyThree extends React.PureComponent {
  render() {
    return (
      <div className="homeSection" id="homeThree">
        <div className="homeBodyHeader">
          Grow Your Community
        </div>
        <button label="Join Us" style={{marginTop:'15px', width:'200px'}}/>
      </div>
    );
  }
}
