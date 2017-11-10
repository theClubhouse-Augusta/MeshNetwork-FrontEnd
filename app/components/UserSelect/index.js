/**
*
* UserSelect
*
*/

import React from 'react';
import Avatar from 'material-ui/Avatar';

import './style.css';
import './styleM.css';

export default class UserSelect extends React.PureComponent {
  render() {
    return (
      <div className="userSelectContainer">
        <p> 
          <label for="userSearch"></label>  
          <input className="userSearch" type="text" placeholder="User search"/>
        </p>

        <div className="userResults">
            <Avatar />
            <Avatar />
            <Avatar />
        </div> 

        
      </div>
    );
  }
}

UserSelect.contextTypes = {
  router: React.PropTypes.object
};
