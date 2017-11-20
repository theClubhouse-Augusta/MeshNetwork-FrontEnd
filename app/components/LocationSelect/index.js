/**
*
* LocationSelect
*
*/

import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import './style.css';
import './styleM.css';

export default class LocationSelect extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {value: 1};
  }

  handleChange = (event, index, value) => this.setState({value});
  
  render() {
    return (
      <div>
           <DropDownMenu value={this.state.value} onChange={this.handleChange} labelStyle={{fontSize: '1.5em'}} menuItemStyle={{fontSize: '1.5em'}}>
           <MenuItem value={1} primaryText="Locations" />
           <MenuItem value={2} primaryText="The Clubhou.se - Augusta, GA" />
           <MenuItem value={3} primaryText="FourAthens - Athens, GA" />       
         </DropDownMenu>
      </div>
    );
  }
}
