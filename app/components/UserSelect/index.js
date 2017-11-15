/**
*
* UserSelect
*
*/

import React from 'react';
import Avatar from 'material-ui/Avatar';
import AutoComplete from 'material-ui/AutoComplete';

import './style.css';
import './styleM.css';

export default class UserSelect extends React.PureComponent {
  state = {
    dataSource: ['Audora', 
  'Austin', 'Nadeem', 'Ivy', 'David'],
  };

  handleUpdateInput = (value) => {
    this.setState({
      dataSource: [
        value,
        value + value,
        value + value + value,
      ],
    });
  };

  render() {    
    return (
      <div className="userSelectContainer">
      
        <div className="userSearchContainer"> 
          <label for="userSearch"></label>  
          <AutoComplete
          className="userSearch"
          hintText="User search"
          dataSource={this.state.dataSource}
          onUpdateInput={this.handleUpdateInput}
        />
          
          <div className="userSelectAutoComp"></div>
        </div>


        <div className="userResults">
            <Avatar size={75}/>
            <Avatar size={75}/>
            <Avatar size={75}/>
        </div> 

        
      </div>
    );
  }
}

UserSelect.contextTypes = {
  router: React.PropTypes.object
};
