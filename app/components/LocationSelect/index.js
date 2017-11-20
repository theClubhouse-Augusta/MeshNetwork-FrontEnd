/**
*
* LocationSelect
*
*/

import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import './style.css';
import './styleM.css';

export default class LocationSelect extends React.PureComponent {
  static propTypes = { children: React.PropTypes.node,};
  static childContextTypes = { muiTheme: React.PropTypes.object };
  getChildContext() {
    var theme = getMuiTheme(); 
    return { muiTheme: theme }
  };

  constructor(props) {
    super(props);
    this.state = {value: [0]};
  }

  handleChange = (event, index, value) => this.setState({value});
  
  render() {
    return (
      <div>
           <DropDownMenu value={this.state.value} openImmediately multiple onChange={this.handleChange} maxHeight={200} autoWidth={false} style={{width: '100%'}} >
           <MenuItem value={0} primaryText="Locations" disabled />
           <MenuItem value={1} primaryText="The Clubhou.se - Augusta, GA" />
           <MenuItem value={2} primaryText="FourAthens - Athens, GA" />       
           <MenuItem value={3} primaryText="FourAthens - Athens, GA" />  
           <MenuItem value={4} primaryText="FourAthens - Athens, GA" />  
           <MenuItem value={5} primaryText="FourAthens - Athens, GA" />  
           <MenuItem value={6} primaryText="FourAthens - Athens, GA" />  
           <MenuItem value={7} primaryText="FourAthens - Athens, GA" />  
           <MenuItem value={8} primaryText="FourAthens - Athens, GA" />  
           <MenuItem value={9} primaryText="FourAthens - Athens, GA" />  
         </DropDownMenu>
      </div>
    );
  }
}
