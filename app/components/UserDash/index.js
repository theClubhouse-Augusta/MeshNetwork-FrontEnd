/**
*
* UserDash
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper'; 
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui'; 

import './style.css';
import './styleM.css';







export default class UserDash extends React.PureComponent {
  constructor(props) {
    super(props); 

    this.state = { 
      columns: [
        { name: 'roleID', title: 'Role', getCellValue: row => (row.user ? row.user.roleID : undefined )},
        { name: 'verfied', title: 'Verified', getCellValue: row => (row.user ? row.user.verified : undefined ) },
        { name: 'name', title: 'Name', getCellValue: row => (row.user ? row.user.name : undefined ) },      
        { name: 'email', title: 'Email', getCellValue: row => (row.user ? row.user.email : undefined ) },      
        { name: 'created_at', title: 'Member Since', 
        getCellValue: row => (row.user ? row.user.created_at : undefined ) },      
        { name: 'ban', title: 'Banned?', getCellValue: row => (row.user ? row.user.ban : undefined )} ,
      ], 
      rows: [ 
        {user: {roleID: '2', verified: '1', name: 'sally sue', email: 'sallys@gmail.com', created_at: 'Jan 3, 2018 16:00', ban: ''}}, 
        {user: {roleID: '2', verified: '1', name: 'bob bobert', email: 'bobert@gmail.com', created_at: 'Jan 3, 2018 16:00', ban: ''}}, 
        ]
    }
  } 
// getCellValue is for if we want to assign the array of users to their own user objs 

//roleID=> actual role name
//created_at => readable date format


/* componentWillMount() { 
    this.loadSpaceUsers(); 
  }

  loadSpaceUsers = (props) => {
    fetch('http://innovationmesh.com/api/users/space/'+ this.props.id, {
      method:'GET'
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      this.setState({
        rows:json
      }, function() {
        console.log(this.state.rows);
      })
    }.bind(this)) 
} */

  render() { 
    const { rows, columns} = this.state; 
  
    return (
      <div className="userDashContainer">
        <Paper> 
          <Grid
              rows={rows}
              columns={columns}>
              <Table />
              <TableHeaderRow />
           </Grid>
        </Paper>
      </div>
    );
  }
}

UserDash.contextTypes = {
  router: PropTypes.object
};
