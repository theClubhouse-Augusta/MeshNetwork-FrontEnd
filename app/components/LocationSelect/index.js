/**
*
* LocationSelect
*
*/

import React from 'react';

import './style.css';
import './styleM.css';

export default class LocationSelect extends React.PureComponent {
  render() {
    return (
      <div>
        { /* temp selection element */ } 
        <select> 
              <option> the Clubhou.se - Augusta, GA</option>
              <option> FourAthens- Athens, GA</option>
            </select>
      </div>
    );
  }
}

LocationSelect.contextTypes = {
  router: React.PropTypes.object
};
