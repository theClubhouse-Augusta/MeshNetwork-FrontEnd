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

// const name = 'firstName' + ',' + 'lastName' ??? 


export default class UserDash extends React.PureComponent {
  constructor(props) {
    super(props); 

    this.state = {
      columns: [
        { name: 'roleID', title: 'role', getCellValue: row => (row.user ? row.user.roleID : undefined )},
        { name: 'verfied', title: 'Verified', getCellValue: row => (row.user ? row.user.verified : undefined ) },
        { name: 'name', title: 'Name', getCellValue: row => (row.user ? row.user.name : undefined ) },      
        { name: 'email', title: 'Email', getCellValue: row => (row.user ? row.user.email : undefined ) },      
        { name: 'created_at', title: 'Member Since', 
        getCellValue: row => (row.user ? row.user.created_at : undefined ) },      
        { name: 'ban', title: 'Banned?', getCellValue: row => (row.user ? row.user.ban : undefined )} ,
      ], 
      rows: [
        {user: { roleID: 0, verified: 1, name: 'User A', email: 'a@gmail.com', created_at: '10/2009', ban: 0 }},     
        ]
    }
  }


  render() { 
    const { rows, columns} = this.state; 
  
    return (
      <div>
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
