/**
*
* TagSearch
*
*/

import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';

import './style.css';
import './styleM.css';

export default class TagSearch extends React.PureComponent {
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
      <div  className="tagSearchContainer"> 
        <label for="tagSearch"></label>  
        
        <AutoComplete
          className="tagSearch"
          hintText="Tag search"
          dataSource={this.state.dataSource}
          onUpdateInput={this.handleUpdateInput}
          textFieldStyle={{maxWidth: '250px'}}
          />
        
      </div>
    );
  }
}

TagSearch.contextTypes = {
  router: React.PropTypes.object
};
