/**
*
* UserDash
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper'; 
import { EditingState } from '@devexpress/dx-react-grid'; 
import { Grid, Table, TableHeaderRow, TableEditRow, TableEditColumn } from '@devexpress/dx-react-grid-material-ui'; 


import './style.css';
import './styleM.css';
import {VerifiedUser} from 'material-ui-icons';

/* TO DO 
    -ROW GENERATOR 
    -POSTS 
    
    -special renders for
      VerifiedUser
      Banned 
    -human readable 
      dates 
      roles     
    
    L8R
*/ 

const getRowId = row => row.id;

export default class UserDash extends React.PureComponent {
  constructor(props) { 
    super(props); 

    this.state = {
      columns: [
        //take & convert role ID
        {name: 'role', title: 'Role'}, 
        {name: 'verified', title: 'Verified'}, 
        {name: 'email', title: 'Email'}, 
        //??
        {name: 'name', title: 'Name'}, 
        //take & convert created_at
        {name: 'dateTime', title: 'Member Since'},
        {name: 'ban', title: ''}, 
      ],
//ROLEID => readable role name
      rows: [
        {id: '1', role: '', verified: '', email: '', name: 'bob bobert', dateTime: '', ban: ''},
        {id: '2', role: '', verified: '', email: '', name: 'sally sue', dateTime: '', ban: ''},
    
        /* there is an option to wrap these in another object if need be
        ie {user: {id:...}} you have to add  getCellValue: row => (row.user ? row.user.id : undefined) to the column dec*/
      ],
      editingRows: [],
      addedRows: [],
      changedRows: {},
    };
    this.changeAddedRows = this.changeAddedRows.bind(this);
    this.changeEditingRows = this.changeEditingRows.bind(this);
    this.changeChangedRows = this.changeChangedRows.bind(this);
    this.commitChanges = this.commitChanges.bind(this);
    this.onEditingRowsChange = this.onEditingRowsChange.bind(this); 
  }

  changeAddedRows(addedRows) {
    this.setState({ addedRows });
  }
  changeEditingRows(editingRows) {
    this.setState({ editingRows });
  }
  changeChangedRows(changedRows) {
    this.setState({ changedRows });
  }

  onEditingRowsChange(editingRows) {
    this.setState({
      editingRows
    });
  }

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


commitChanges({ added, changed, deleted }) {

}

  render() {
    const { rows, columns, editingRows, addedRows, changedRows } = this.state;


    return (
      <div className="userDashContainer">
        <Paper> 
          <Grid
            rows={rows} 
            columns={columns}
            getRowId={getRowId}
            > 
            <EditingState
              onCommitChanges={this.commitChanges}
              editingRows={editingRows}
              onEditingRowsChange={this.onEditingRowsChange}
          />
          <Table />
          <TableHeaderRow />
          <TableEditRow />
          <TableEditColumn
            showAddCommand
            showEditCommand
            showDeleteCommand
            allowEditing={!editingRows.length}
          />
          </Grid>
        </Paper>
      </div>
    );
  }
}


UserDash.contextTypes = {
  router: PropTypes.object
};
