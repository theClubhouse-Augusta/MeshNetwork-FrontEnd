/**
*
* HomeBodyTwo
*
*/

import React from 'react';
import DefaultButton from 'components/CustomUI/DefaultButton'; 

import './style.css';
import './styleM.css';

export default class HomeBodyTwo extends React.PureComponent {
  render() {
    return (
      <div className="homeSection" id="homeTwo">
        <div className="homeBodyHeader">
          Join A Community
        </div>
        <DefaultButton style={{marginTop:'2em', width:'200px'}}> Find Yours </DefaultButton>
      </div>
    );
  }
}

