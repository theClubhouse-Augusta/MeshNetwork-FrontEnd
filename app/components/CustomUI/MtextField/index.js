/**
*
* MtextField
*
*/

import React from 'react';

import './style.css';
import './styleM.css';

export default class MtextField extends React.PureComponent {
  render() {
    return (
      <div>
        <input className="MeshTextField"/>
      </div>
    );
  }
}

MtextField.contextTypes = {
  router: React.PropTypes.object
};
