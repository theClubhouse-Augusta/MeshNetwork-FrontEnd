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

const userUpdateAPI = 'http://www.innovationmesh.com/api/updateUser'; 


export default class UserDash extends React.PureComponent {
  constructor(props) { 
    super(props); 

    this.state = {
      columns: [
        {name: 'role', title: 'Role'}, 
        //{name: 'verified', title: 'Verified'}, 
        {name: 'email', title: 'Email'}, 
        {name: 'name', title: 'Name'}, 
        //take & convert created_at
        {name: 'dateTime', title: 'Member Since'},
        {name: 'ban', title: 'Ban'}, 
      ],
      rows: props.users, 
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

//created_at => readable date format

componentWillReceiveProps(users) {
  this.setState({rows: this.props.users})    
}

commitChanges({ added, changed, deleted }) {
  let rows = this.state; 

  data.append()

  fetch(userUpdateAPI, {
    method: 'POST', 
    body: data, 
  })
  .then(response => response.json())
  .catch(error => {
    console.log(error); 
  })
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
