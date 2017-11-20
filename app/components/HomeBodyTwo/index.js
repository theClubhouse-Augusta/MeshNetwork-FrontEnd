/**
*
* HomeBodyTwo
*
*/

import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import './style.css';
import './styleM.css';

export default class HomeBodyTwo extends React.PureComponent {
  render() {
    return (
      <div className="homeSection" id="homeTwo">
        <div className="homeBodyHeader">
          Join A Community
        </div>
        <RaisedButton label="Join Us" backgroundColor="#26aae1" labelColor="#FFFFFF" style={{marginTop:'15px', width:'200px'}}/>
      </div>
    );
  }
}

