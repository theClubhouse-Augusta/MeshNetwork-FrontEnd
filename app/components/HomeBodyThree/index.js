/**
*
* HomeBodyThree
*
*/

import React from 'react';
import DefaultButton from 'components/CustomUI/DefaultButton'; 

import './style.css';
import './styleM.css';

export default class HomeBodyThree extends React.PureComponent {
  render() {
    return (
      <div className="homeSection" id="homeThree">
        <div className="homeBodyHeader">
          Grow Your Community
        </div>
        <DefaultButton style={{marginTop:'15px', width:'200px'}}> Join Us </DefaultButton>
      </div>
    );
  }
}
