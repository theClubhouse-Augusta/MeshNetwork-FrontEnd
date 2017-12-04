/**
*
* HomeBodyTwo
*
*/

import React from 'react';

import './style.css';
import './styleM.css';

export default class HomeBodyTwo extends React.PureComponent {
  render() {
    return (
      <div className="homeSection" id="homeTwo">
        <div className="homeBodyHeader">
          Join A Community
        </div>
        <button label="Join Us" style={{marginTop:'15px', width:'200px'}}/>
      </div>
    );
  }
}

