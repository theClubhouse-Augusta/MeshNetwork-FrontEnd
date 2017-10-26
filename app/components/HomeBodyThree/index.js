/**
*
* HomeBodyThree
*
*/

import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import './style.css';
import './styleM.css';

export default class HomeBodyThree extends React.PureComponent {
  render() {
    return (
      <div className="homeSection" id="homeThree">
        <div className="homeBodyHeader">
          Grow Your Community
        </div>
        <RaisedButton label="Join Us" backgroundColor="#26aae1" labelColor="#FFFFFF" style={{marginTop:'15px', width:'200px'}}/>
      </div>
    );
  }
}

HomeBodyThree.contextTypes = {
  router: React.PropTypes.object
};
