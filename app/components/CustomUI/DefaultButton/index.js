/**
*
* DefaultButton
*
*/

import React from 'react';

import './style.css';
import './styleM.css';

export default class DefaultButton extends React.PureComponent {
  render() {
    return (
      <button className="MeshDefaultButton left"> 
        {this.props.children}
      </button> 
    );
  }
}

DefaultButton.contextTypes = {
  router: React.PropTypes.object
};
