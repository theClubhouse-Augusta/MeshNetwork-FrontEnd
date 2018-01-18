/**
*
* UserDash
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper'; 
import Moment from 'react-moment'; 
import { EditingState } from '@devexpress/dx-react-grid'; 
import { Grid, Table, TableHeaderRow, TableEditRow, TableEditColumn } from '@devexpress/dx-react-grid-material-ui'; 


import './style.css';
import './styleM.css';
import {VerifiedUser} from 'material-ui-icons';

const userUpdateAPI = 'http://www.innovationmesh.com/api/updateUser'; 


export default class UserDash extends React.PureComponent {
  constructor(props) { 
    super(props); 

    this.state = {
      rows: [
        { id: 1, name: 'Bob', lastName: 'Brown', age: 21 },
        { id: 2, name: 'John', lastName: 'Smith', age: 35 },
        { id: 3, name: 'Mike', lastName: 'Mitchel', age: 28 },
      ],
      columns: [
        { name: 'name', title: 'Name' },
        { name: 'lastName', title: 'Last Name' },
        { name: 'age', title: 'Age' },
      ],
      editingRows: [],
      addedRows: [],
      changedRows: {},
    };

    this.changeAddedRows = this.changeAddedRows.bind(this);
    this.changeEditingRows = this.changeEditingRows.bind(this);
    this.changeChangedRows = this.changeChangedRows.bind(this);
    this.commitChanges = this.commitChanges.bind(this);
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

  commitChanges() {
    // Commit logic
  }
//created_at => readable date format

componentWillReceiveProps(users) {
  this.setState({rows: this.props.users})    
}

  render() {
    const { rows, 
            columns,  
            editingRows, 
            addedRows, 
            changedRows,
            deletingRows } = this.state;

    return (
      <div className="userDashContainer">
        <Paper> 
          <Grid
            rows={rows} 
            columns={columns}
            getRowId={row => row.id}
            > 
            <EditingState
            editingRows={editingRows}
            onEditingRowsChange={this.changeEditingRows}
            changedRows={changedRows}
            onChangedRowsChange={this.changeChangedRows}
            addedRows={addedRows}
            onAddedRowsChange={this.changeAddedRows}
            onCommitChanges={this.commitChanges}
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
